import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Loader } from "../index";
const ConfirmMessage = (props) => {
  function closeMessage() {
    setTimeout(props.handelClose, 1000);
  }

  return (
    <Modal show={props.showConfirmMsg}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.isloading ? (
          <Loader title={"Please wait..."} />
        ) : props.error ? (
          `${props.error}`
        ) : props.isSuccess ? (
          `${props.title} has been successfully `
        ) : (
          props.message
        )}
      </Modal.Body>
      <Modal.Footer>
        {props.isloading ? (
          ""
        ) : props.isSuccess ? (
          closeMessage()
        ) : (
          <>
            <Button variant="danger" onClick={props.handelClick}>
              Delete
            </Button>
            <Button className={`btn btn-badget`} onClick={props.handelClose}>
              Cancel
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmMessage;
