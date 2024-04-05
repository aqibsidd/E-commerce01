import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Checkout from "./Components/Checkout/Checkout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Signup/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={""}>
            {/* Nested routes */}
            <Route index element={<Home />}></Route>
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
