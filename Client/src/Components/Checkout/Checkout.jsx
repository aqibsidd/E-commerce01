import React, { useEffect, useState } from "react";
import "./Checkout.scss";
import Subtotal from "../Subtotal/Subtotal";
import img from "../mvp.jpg";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../ContextApi/StateProvider";
import axios from "axios";
const Checkout = () => {
  const [{ basket }, dispatch] = useStateValue();
  const [cartItem, getAllCartItem] = useState();
  const [userid, setUserid] = useState(null);
  const setcart = (product) => {
    getAllCartItem(product);
  };
  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("products")) || [];
    setcart(product);
  }, [localStorage.getItem("products")]);
  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("products")) || [];
    setcart(product);
  }, [cartItem]);
  const [signedIn, setLogin] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("userID");
    const product = JSON.parse(localStorage.getItem("products")) || [];
    setcart(product);
    if (user !== null && user != undefined) {
      setLogin(true);
      setUserid(user);
      syncCartWithDatabase(user, product);
    }
  }, []);
  const [cartDB, setcartDb] = useState();
  const getUserCartFromDatabase = async (id) => {
    try {
      await axios.get(`http://localhost:5500/api/cart?id=${id}`).then((res) => {
        console.log("DatafromDB", res.data.data);
        setcartDb(res.data.data);
      });
    } catch (error) {}
  };

  async function syncCartWithDatabase(user, localCart) {
    try {
      // Get user's cart from the database
      const response = await axios.get(
        `http://localhost:5500/api/cart?id=${user}`
      );
      const userCartFromDatabase = response.data.data;
      console.log("DatafromDB", userCartFromDatabase);
      console.log("localcart", localCart);

      //Check for products from local storage not in user's cart
      const productsToAdd = localCart.filter(
        (product) =>
          !userCartFromDatabase.some(
            (item) => item.productId === product.productId
          )
      );

      // Add products from local storage to user's cart in the database
      addProductsToUserCart(productsToAdd, user);

      // Check for products in user's cart not in local storage
      const productsToAddToLocal = userCartFromDatabase.filter(
        (product) =>
          !localCart.some((item) => item.productId === product.productId)
      );

      // Add products from database to local storage
      addToLocalCart(localCart, productsToAddToLocal);
    } catch (error) {
      console.error("Error syncing cart with database:", error);
    }
  }
  function addToLocalCart(localcart, products) {
    console.log("addtolocal", localcart);
    const updatedCart = [...localcart, ...products];
    localStorage.setItem("products", JSON.stringify(updatedCart));
  }
  async function addProductsToUserCart(productsToAdd, userid) {
    try {
      console.log("pta", productsToAdd);
      await Promise.all(
        productsToAdd.map(async (element) => {
          element.userId = userid;
          console.log("sss", element);
          await axios.post(`http://localhost:5500/api/cart`, element);
        })
      );
    } catch (error) {
      console.error("Error adding products to user cart:", error);
    }
  }
  return (
    <div className="Checkout">
      <div className="leftChck">
        <h1>Here are your Products</h1>
        {cartItem?.map((item) => {
          return (
            <CheckoutProduct
              id={item.productId}
              img={img}
              name={item.name}
              desc={item.description}
              price={item.price}
              category={item.cat}
            />
          );
        })}
      </div>
      <div className="rightChck">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
