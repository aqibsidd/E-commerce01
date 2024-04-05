import "./CheckoutProduct.scss";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../ContextApi/StateProvider";
import axios from "axios";
const CheckoutProduct = (props) => {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: props.id,
    });
  };
  const uid = props.id;
  const getSignInfo = (user) => {
    if (user !== null && user != undefined) {
      setLogin(true);
      return;
    }
  };
  const [signedIn, setLogin] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("userID");

    getSignInfo(user);
  }, [signedIn]);

  const removeFromCart = (id) => {
    if (signedIn) {
      axios.delete(`http://localhost:5500/api/cart?id=${uid}`).then((res) => {
        alert("Product Deleted");
      });
    }
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: props.id,
    });

    // Retrieve the existing products data array from local storage
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Find the index of the product to be removed
    const index = existingProducts.findIndex(
      (product) => product.productId === id
    );

    // If the product is found, remove it from the array
    if (index !== -1) {
      existingProducts.splice(index, 1);
      // Save the updated array back to local storage
      localStorage.setItem("products", JSON.stringify(existingProducts));
      console.log("done");
    }
  };

  return (
    <div className="CheckoutProduct">
      <div className="CardChckout">
        <img src={props.img} alt="" id="imgCard" />
        <div className="Chkinfo">
          <h3 className="TextCard">{props.name}</h3>
          <h6 className="TextCard">{props.cat}</h6>
          <h6 className="TextCard">{props.desc}</h6>
          <h2 className="TextCard">${props.price}</h2>
        </div>
      </div>
      <div className="Btn">
        <button
          className="btn__checkoutP"
          onClick={() => removeFromCart(uid)}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
