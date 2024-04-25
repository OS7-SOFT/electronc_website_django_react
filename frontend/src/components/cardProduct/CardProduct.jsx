import React from "react";
import { Card } from "react-bootstrap";
import "./CardProduct.css";
import { Stars } from "../index";
import { Link } from "react-router-dom";

const CardProduct = (props) => {
  return (
    <Card className={"product-card"}>
      <Card.Img className={"image w-100"} src={props.product.image_url} />
      <Card.Body className={"text-center"}>
        <span className={"text-black-50 d-block"}>
          {props.product.category
            ? `${props.product.category.name}`
            : "Not have"}
        </span>
        <span className={"d-block fs-5 fw-bold"}>{props.product.name}</span>
        <div>
          <span className={" fs-5 fw-bold text-danger"}>
            ${props.product.new_price}
          </span>
          {props.product.old_price > 0 && (
            <del className={"old-price"}>${props.product.old_price}</del>
          )}
        </div>
        <ul
          className={
            "rate d-flex align-items-center justify-content-center position-relative"
          }
        >
          <Stars value={props.product.rating} size={"12px"} />
        </ul>
        <ul
          className={
            "icons my-2 d-flex align-items-center justify-content-center"
          }
        >
          <li>
            <Link to={`/product-details/${props.product.id}`}>
              <i className="fa fa-eye "></i>ww
            </Link>
          </li>
          <li>
            <i
              onClick={props.handelAddToWishlist}
              className="btn-favorite fas fa-heart"
            >
              kk
            </i>
          </li>
        </ul>
        <button onClick={props.handelAddToCart}>ADD TO CART</button>
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
