import React, { useEffect, useState } from "react";
import hero from "../Eshop.jpg";
import Product from "../Product/Product";
import img from "../mvp.jpg";
import "./Home.scss";
import axios from "axios";
const Home = () => {
  const [products, getProducts] = useState([]);
  const [id, getid] = useState("");
  const [signedIn, setLogin] = useState(false);
  const getAllProduct = async () => {
    try {
      await axios.get("http://localhost:5500/api/products").then((res) => {
        getProducts(res.data.data.products);
        console.log(res.data.data.products);
      });
    } catch (error) {}
  };
  useEffect(() => {
    const user = localStorage.getItem("userID");

    getid(user);
    if (user !== null && user != undefined) {
      setLogin(true);
    }
    getAllProduct();
  }, []);

  console.log(localStorage.getItem("userID"));
  useEffect(() => {
    console.log(localStorage.getItem("userID"));
  }, []);

  return (
    <div className="HomePage">
      <div className="Hero">
        <img
          src={hero}
          alt=""
          style={{ width: "100%", height: "40vh", zIndex: "-50px" }}
        />
      </div>
      <div className="ContentHero">
        <div className="rowCard">
          {products.map((item) => {
            return (
              <Product
                img={img}
                price={item.price}
                name={item.name}
                desc={item.description}
                category={item.category}
                isLoggedIn={signedIn}
                uid={id}
                id={item._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
