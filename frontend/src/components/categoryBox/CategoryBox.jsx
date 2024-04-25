import React from "react";
import "./CategoryBox.css";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const CategoryBox = (props) => {
  return (
    <div className={"shop"}>
      <div
        className={
          "image overflow-hidden d-flex justify-content-center align-items-center"
        }
      >
        <img className="w-100" src={props.image} />
      </div>
      <div className={"body text-white"}>
        <h3 className={"w-50 text-white"}>{props.title} Collections</h3>
        <Link to={`${props.url}`} className={"d-block text-white"}>
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default CategoryBox;
