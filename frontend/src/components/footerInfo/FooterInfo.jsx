import React from "react";
import { Col } from "react-bootstrap";
const FooterInfo = (props) => {
  return (
    <Col md={"6"} lg={"3"} className={"text-white"}>
      <h5 className={"  fw-bold mb-3"}>{props.info.title}</h5>
      <ul>
        {props.info.list.map((ele) => (
          <li key={ele}>
            <a href="">{ele}</a>
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default FooterInfo;
