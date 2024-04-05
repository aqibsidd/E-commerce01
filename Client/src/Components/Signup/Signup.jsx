import React, { useState } from "react";
import "./Signup.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(userData);
  };

  const register = () => {
    try {
      axios.post("http://localhost:5500/api/user", userData).then((res) => {
        console.log("Signin");
        alert("Welcome to LootBazar");
        const data = res.data.data.doc._id;
        const name = res.data.data.doc.username;
        localStorage.setItem("userID", data);
        localStorage.setItem("name", name);
        navigate("/Home");
        window.location.reload();
      });
    } catch (error) {
      console.log("err");
    }
  };

  return (
    <div className="signup-container ">
      <form className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          required
          name="username"
          onChange={handleInput}
        />
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          onChange={handleInput}
        />
        <button type="submit" onClick={register}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
