import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Notification.css";
import { Alert, Card } from "react-bootstrap";
import { NotifyMessage } from "../index.js";

import { Loader } from "../index";
const Notification = ({ open, handelClose, loading, error, notifications }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 0, display: "none" }}
      animate={
        open
          ? { opacity: 1, translateY: 10, display: "block" }
          : { display: "none" }
      }
      transition={{ duration: 0.2 }}
      id={"notification"}
      className={"position-absolute"}
    >
      <Card className="h-100">
        <Card.Header
          className={"head d-flex justify-content-between align-items-center"}
        >
          <span>Notifications</span>
          <i
            className={"fa fa-times"}
            onClick={() => {
              handelClose();
            }}
          ></i>
        </Card.Header>
        <Card.Body className="overflow-auto">
          {loading ? (
            <Loader title={"Getting notifications..."} />
          ) : error ? (
            <Alert variant={"danger"}>{error}</Alert>
          ) : notifications.length > 0 ? (
            notifications.map((notify) => (
              <NotifyMessage
                key={notify.id}
                title={
                  notify.quantity <= 10
                    ? `Quantity ${notify.name} is approaching depletion`
                    : `Quantity ${notify.name} is nearing depletion`
                }
                message={
                  notify.quantity <= 10
                    ? `The quantity of ${notify.name} is almost depleted, with only ${notify.quantity} pieces remaining in stock, Please check inventory for verification of availability.`
                    : `The quantity of ${notify.name} is approaching depletion, with only ${notify.quantity} pieces remaining.`
                }
              />
            ))
          ) : (
            <Alert>No there any notifications</Alert>
          )}
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </motion.div>
  );
};

export default Notification;
