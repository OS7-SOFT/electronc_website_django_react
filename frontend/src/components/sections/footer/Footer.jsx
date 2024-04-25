import React from "react";
import "./Footer.css";
import { Col, Container, Row } from "react-bootstrap";
import { FooterInfo } from "../..";
const Footer = () => {
  const appInfo = [
    {
      id: 1,
      title: "Categories",
      list: ["Laptops", "Smartphone", "Cameras", "Accessories"],
    },
    {
      id: 2,
      title: "Informatoin",
      list: ["About us", "Contact us", " Terms & Condition"],
    },
    { id: 3, title: "Services", list: ["My Account", "Store", "Cart", "Help"] },
  ];

  return (
    <div id="footer" className={"pt-5"}>
      <Container>
        <Row>
          <Col md={"6"} lg={"3"} className={"text-white"}>
            <h5 className={"  fw-bold mb-3"}>ABOUT US</h5>
            <p className={"text-white-50"}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequatur pariatur ipsa enim ratione, vitae fugiat.
            </p>
            <ul className={"text-white-50"}>
              <li>email@gmail.com</li>
              <li>+123 524 877</li>
              <li>0022 New Yourk</li>
            </ul>
          </Col>
          {appInfo.map((info) => (
            <FooterInfo key={info.id} info={info} />
          ))}
        </Row>
      </Container>
      <div className={"footer-bottom text-center text-white-50 py-3"}>
        <span className={"copyright"}>
          Copyright ©<script>document.write(new Date().getFullYear());</script>
          2023 All rights reserved | This template is made with{" "}
          <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
          <a href="https://colorlib.com" target="_blank">
            Colorlib
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
