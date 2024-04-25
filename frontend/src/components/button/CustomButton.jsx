import React from "react";
import "./CustomButton.css";
const CustomButton = (props) => {
  return (
    <button onClick={props.handelClick} className="text-uppercase">
      {props.name}
    </button>
  );
};

export default CustomButton;
