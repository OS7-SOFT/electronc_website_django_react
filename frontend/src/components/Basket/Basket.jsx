import React from "react";
import "./Basket.css";
import { BasketItem } from "../index";
import { Link } from "react-router-dom";
import { motion, useReducedMotionConfig } from "framer-motion";

const Basket = (props) => {
  const name = `${props.isCart ? "cart-list" : "wishlist"}`;

  return (
    <motion.div
      id="basket"
      initial={{ opacity: 0, translateY: 10, display: "none" }}
      animate={
        props.open
          ? { opacity: 1, translateY: 0, display: "block" }
          : { opacity: 0, translateY: 10, display: "none" }
      }
      transition={{ duration: 0.2 }}
    >
      <div className={"box-items overflow-auto"}>
        {props.items.length === 0 ? (
          <div className={"d-flex justify-content-center align-items-center"}>
            <h5>No there any items</h5>
          </div>
        ) : (
          props.items.map((item) => (
            <BasketItem
              key={item.id}
              product={item}
              handelDelete={() => {
                props.handelDelete(item.id);
              }}
            />
          ))
        )}
      </div>
      <div className={"d-flex justify-content-between align-items-center"}>
        {props.items.length} item(s) Selected
        <span className={"btn-clear fw-bold"} onClick={props.handelClear}>
          Clear
        </span>
      </div>

      {props.isCart && props.items.length > 0 && (
        <Link
          onClick={() => {
            props.handelClose(name);
          }}
          to={props.userInfo ? "/checkout/" : "/login/"}
          className={`w-100 btn-checkout ${
            props.userInfo && props.userInfo.is_staff && "d-none"
          }`}
        >
          Checkout
        </Link>
      )}
    </motion.div>
  );
};

export default Basket;
