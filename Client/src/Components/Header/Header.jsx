import React, { useEffect, useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useStateValue } from "../ContextApi/StateProvider";

import "./Header.scss";
import axios from "axios";

const Header = () => {
  const [{ basket }, dispatch] = useStateValue();
  const [loge, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [toggler, setToggle] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("userID");
    setName(localStorage.getItem("name"));
    const products = localStorage.getItem("products");
    if (user !== null && user != undefined) {
      setLogin(true);
      syncCartWithDatabase(user, products);
    }
  }, []);

  async function syncCartWithDatabase(user, localCart) {
    try {
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
  const logout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("name");
    localStorage.removeItem("products");
    alert("you are logged out");
    window.location.reload();
  };
  const [len, setLength] = useState();
  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("products")) || [];
    console.log("LC", product);
    console.log("LC", product.length);
    setLength(product.length);
  }, [localStorage.getItem("products")]);
  return (
    <div className="Header">
      <div className="left">
        <Link
          to="/Home"
          style={{
            textDecoration: "none",
            display: "flex",
            color: "white",
            alignItems: "center",
          }}
        >
          <StoreIcon fontSize="large" style={{ color: "yellow" }} />
          <h2 className="left-brand">LootBazaar</h2>
        </Link>
      </div>

      {loge ? (
        <div className="right">
          <div className="NavLinks">
            <span className="linkOne">Hello </span>
            <span>{name}</span>
          </div>
          <div className="NavLinks">
            <span className="linkOne">Your</span>
            <span className="linkTwo">Shop</span>
          </div>
          <div className="NavLinks">
            <Link
              to="/Checkout"
              style={{ textDecoration: "none", color: "white" }}
            >
              <span className="linkOne">
                <LocalGroceryStoreIcon
                  fontSize="medium"
                  style={{ color: "yellow" }}
                />
                <br />
              </span>
              <span className="linkTwo">{len}</span>
            </Link>
          </div>
          <div className="NavLinks">
            <span className="linkOne">Account</span>
            <span id="logout" className="linkTwo" onClick={logout}>
              Logout
            </span>
          </div>
        </div>
      ) : (
        <div className="right">
          <div className="NavLinks">
            <span className="linkOne">Hello Guest</span>
            <Link to={"/login"} className="textw">
              Login
            </Link>{" "}
          </div>
          <div className="NavLinks">
            <span className="linkOne">Your</span>
            <span className="linkTwo">Shop</span>
          </div>
          <div className="NavLinks">
            <Link
              to="/Checkout"
              style={{ textDecoration: "none", color: "white" }}
            >
              <span className="linkOne">
                <LocalGroceryStoreIcon
                  fontSize="medium"
                  style={{ color: "yellow" }}
                />
                <br />
              </span>
              <span className="linkTwo">{len}</span>
            </Link>
          </div>
          <div className="NavLinks">
            <span className="linkOne">First Time?</span>
            <span className="linkTwo">
              <Link to={"/signup"} className="textw">
                Sign UP
              </Link>{" "}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
