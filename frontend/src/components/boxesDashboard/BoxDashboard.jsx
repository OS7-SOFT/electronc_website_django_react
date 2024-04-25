import React from "react";
import { Col } from "react-bootstrap";
import "./BoxDashboard.css";

const BoxDashboard = (props) => {
  return (
    <Col id="box-dashboard" md={"6"} lg={"3"}>
      <div>
        <div className="icon" style={{ backgroundColor: `${props.color}` }}>
          <i className={`fa fa-${props.icon} text-white p-3`}></i>
        </div>
        <div className="stat text-secondary">
          <span className="h5 d-block mb-1">{props.count}</span>
          <small>{props.title}</small>
        </div>
      </div>
    </Col>
  );
};

export default BoxDashboard;
