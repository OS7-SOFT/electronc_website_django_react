import { motion } from "framer-motion";
import "./MessageBox.css";
import { Alert, Card } from "react-bootstrap";
import { NotifyMessage } from "../index.js";

import { Loader } from "../index";
const MessageBox = ({ open, handelClose, loading, error, messages }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 0, display: "none" }}
      animate={
        open
          ? { opacity: 1, translateY: 10, display: "block" }
          : { display: "none" }
      }
      transition={{ duration: 0.2 }}
      id={"message-box"}
      className={"position-absolute"}
    >
      <Card className="h-100">
        <Card.Header
          className={"head d-flex justify-content-between align-items-center"}
        >
          <span>Messages</span>
          <i
            className={"fa fa-times"}
            onClick={() => {
              handelClose();
            }}
          ></i>
        </Card.Header>
        <Card.Body className="overflow-auto">
          {loading ? (
            <Loader title={"Getting messages..."} />
          ) : error ? (
            <Alert variant={"danger"}>{error}</Alert>
          ) : messages.length > 0 ? (
            messages.map((msg) => (
              <NotifyMessage
                key={msg.id}
                title={"New order is Paid"}
                message={`${msg.full_name} has paid for his order, Check his order in the orders tables`}
              />
            ))
          ) : (
            <Alert>No there any messages</Alert>
          )}
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    </motion.div>
  );
};

export default MessageBox;
