import React from "react";
import "./BottomHeader.css";
import { Container } from "react-bootstrap";
import { CustomLink } from "../index";

const BottomHeader = () => {
  return (
    <div id={"bottom-header"} className={"close open"}>
      <Container>
        <ul className={"d-flex "}>
          <CustomLink to={"/"}>Home</CustomLink>
          <CustomLink to={"/store"}>Store</CustomLink>
          <CustomLink to={"/store/Laptops"}>Laptops</CustomLink>
          <CustomLink to={"/store/Smartphones"}>Smartphones</CustomLink>
          <CustomLink to={"/store/Cameras"}>Cameras</CustomLink>
          <CustomLink to={"/store/Accessories"}>Accessories</CustomLink>
        </ul>
      </Container>
    </div>
  );
};

export default BottomHeader;
