import React from "react";
import { Spinner } from "react-bootstrap";

function Loader({ title }) {
  return (
    <div className={"text-center"}>
      <Spinner
        animation="border"
        role="status"
        style={{
          margin: "auto",
          display: "block",
        }}
      ></Spinner>
      <span className={"d-block my-2"}>{title}</span>
    </div>
  );
}

export default Loader;
