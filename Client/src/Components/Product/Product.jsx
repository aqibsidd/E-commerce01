import React from "react";
import "./Product.scss";
import { useStateValue } from "../ContextApi/StateProvider";
import axios from "axios";
const Product = (props) => {
  //ye un states m cheeze add krane ya actions perform krne k lie hum us wale hook ko use krre h
  const [state, dispatch] = useStateValue();
  const AddToBasket = () => {
    console.log(props.isLoggedIn);
    dispatch({
      //yha setter function me reducer me case type aur object bnadia jo as object store hoga basket me
      type: "ADD_TO_BASKET",
      item: {
        id: props.id,
        image: props.img,
        price: props.price,
        name: props.name,
        desc: props.desc,
        cat: props.category,
      },
    });
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Add the new product to the existing array
    const updatedProducts = [...existingProducts, dataCart];

    // Save the updated array back to local storage
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };
  const dataCart = {
    userId: props.uid,
    productId: props.id,
    name: props.name,
    quantity: 1,
    price: props.price,
  };
  const AddToCart = async () => {
    console.log("sdsds");
    try {
      await axios
        .post("http://localhost:5500/api/cart", dataCart)
        .then((res) => {
          console.log(res);
        });
      dispatch({
        //yha setter function me reducer me case type aur object bnadia jo as object store hoga basket me
        type: "ADD_TO_BASKET",
        item: {
          id: props.id,
          image: props.img,
          price: props.price,
          name: props.name,
          desc: props.desc,
          cat: props.category,
        },
      });
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];

      // Add the new product to the existing array
      const updatedProducts = [...existingProducts, dataCart];

      // Save the updated array back to local storage
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } catch (error) {}
  };

  return (
    <div className="Product">
      <div className="product__image">
        <img src={props.img} id="imgCard" alt="" />
      </div>
      <div className="product__Info">
        <h5 id="name">
          <strong>{props.name}</strong>
        </h5>
        <p>Category: {props.category}</p>
        <p id="desc">{props.desc}</p>
      </div>
      <div id="last">
        <h3 id="price">
          <small>$</small>
          {props.price}
        </h3>
        <div className="product__btn">
          <button
            onClick={props.isLoggedIn ? AddToCart : AddToBasket}
            className="btnCart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
