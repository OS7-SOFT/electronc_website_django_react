import React from "react";
import "./OrderList.css";

const OrderList = (props) => {
  return (
    <div className="d-flex justify-content-between mb-4">
      <div>{props.order.name}</div>
      <small>{props.order.qty}</small>
      <div>${props.order.new_price}</div>
    </div>
  );
};

export default OrderList;
