import React, { useEffect, useState } from "react";
import "./Signup.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [x, setX] = useState();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const handleInput = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(userData);
  };
  const register = async () => {
    try {
      const res = await axios.post("http://localhost:5500/api/login", userData);
      console.log(res.data.data.doc._id);
      const data = res.data.data.doc._id;
      const name = res.data.data.doc.username;
      localStorage.setItem("userID", data);
      localStorage.setItem("name", name);
      navigate("/Home");
      window.location.reload();
    } catch (error) {
      console.log("err");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Login</h2>
        <p>{x}</p>

        <input
          type="text"
          name="username"
          placeholder="username"
          required
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleInput}
        />
        <button type="submit" onClick={register}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
