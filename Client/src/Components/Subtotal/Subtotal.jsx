import React, { useEffect, useState } from "react";
import "./Subtotal.scss";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../ContextApi/StateProvider";
import { getBasketTotal } from "../ContextApi/Reducer";
const Subtotal = () => {
  const [{ basket }, dispatch] = useStateValue();
  const [len, setLength] = useState();
  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("products")) || [];
    console.log("LC", product);
    console.log("LC", product.length);
    setLength(product.length);
  }, [localStorage.getItem("products")]);
  return (
    <div className="Subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({len} items): <strong>${value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This Order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType="text"
        thousandSeparator={true}
      />
      <button id="btnPtC"> Proceed To Checkout</button>
    </div>
  );
};

export default Subtotal;
