import React, { useContext } from "react";
import "./Content.css";
import {
  Orders,
  Products,
  Clients,
  Dashboard,
  Shipping,
} from "../sections/index";
import { Container } from "react-bootstrap";
import { AdminContent } from "../../App";
const Content = () => {
  const { currentContent } = useContext(AdminContent);

  function CurrentContent(current) {
    let result;
    switch (current) {
      case "Dashboard":
        result = <Dashboard />;
        break;
      case "Clients":
        result = <Clients />;
        break;
      case "Products":
        result = <Products />;
        break;
      case "orders":
        result = <Orders />;
        break;
      case "shipping":
        result = <Shipping />;
        break;
      default:
        break;
    }
    return result;
  }

  return (
    <div className="main-content p-3 ">
      <Container>{CurrentContent(currentContent)}</Container>
    </div>
  );
};

export default Content;
