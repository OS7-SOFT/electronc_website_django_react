import React from "react";
import "./CheckBox.css";

const CheckBox = (props) => {
  return (
    <div id="check-box" className="input-checkbox">
      <input
        type="checkbox"
        id={`${props.brand.id}`}
        onChange={props.handelCheck}
        value={`${props.brand.id}`}
      />
      <label htmlFor={`${props.brand.id}`}>
        <span></span>
        {props.brand.name}
        <small>({props.brand.total_products})</small>
      </label>
    </div>
  );
};

export default CheckBox;
