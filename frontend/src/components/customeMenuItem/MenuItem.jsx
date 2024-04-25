import React from "react";

import "./MenuItem.css";
function MenuItem(props) {
  return (
    <li
      className={`item ${props.isActive && "active"}`}
      onClick={() => props.handelClick(props.name)}
    >
      <div className={`d-flex align-items-center text-capitalize `}>
        <i className={`fa fa-${props.icon}`}></i>
        {props.name}
      </div>
    </li>
  );
}

export default MenuItem;
