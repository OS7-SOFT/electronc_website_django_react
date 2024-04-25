import React from "react";
import { Link } from "react-router-dom";
const BasketItem = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div className={"d-flex"}>
        <div className="image">
          <div className="remove bg-black">
            <i
              className={"fa fa-close text-white"}
              onClick={props.handelDelete}
            ></i>
          </div>
          <img
            src={props.product.image_url}
            className={"w-100"}
            alt={"Image"}
          />
        </div>
        <div className="info">
          <Link to={`/product-details/${props.product.id}`}>
            <span>{props.product.name}</span>
          </Link>
          <span>${props.product.new_price}</span>
        </div>
      </div>
      <div className={"mx-2"}>{props.product.qty}</div>
    </div>
  );
};

export default BasketItem;
