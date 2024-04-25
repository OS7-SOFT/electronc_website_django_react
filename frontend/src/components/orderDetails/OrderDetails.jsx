import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { CustomMessage, Loader } from "../index";
import { Modal, Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getOrderList } from "../../redux/actions/orderActions";

function OrderDetails({ showDetails, handelClose, orderDetails, isAdmin }) {
  const dispatch = useDispatch();

  const { loading, error, order } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success,
    error: errorDeliver,
  } = orderDeliver;

  const [showMsg, setShowMsg] = useState(false);
  const [showMsgSuccessed, setShowMsgSuccessed] = useState(true);

  useEffect(() => {
    if (success) {
      dispatch(getOrderList());
      setTimeout(() => {
        setShowMsgSuccessed(false);
        handelClose();
      }, 800);
    }
  }, [success]);

  useEffect(() => {
    loadingDeliver
      ? setShowMsgSuccessed(false)
      : success && setShowMsgSuccessed(true);
  }, [success, loadingDeliver]);

  const handelDeliver = (isPaid, id) => {
    if (isPaid) {
      dispatch(deliverOrder(id));
    } else {
      setShowMsg(true);
    }
  };

  const handelCloseMessage = () => {
    setShowMsg(false);
  };

  return (
    <Modal show={showDetails}>
      <CustomMessage
        showMssage={showMsg}
        haveButton={"close"}
        handelClose={handelCloseMessage}
        title={"Order not paid yet...!"}
        message={"This order not paid yet , for that you cannot deliver it."}
      />

      {loadingDeliver ? (
        ""
      ) : errorDeliver ? (
        <Alert variant={"danger"}>{errorDeliver}</Alert>
      ) : (
        success && (
          <CustomMessage
            title={`Deliver Successfully`}
            message={`Order Deliver has been Successfully`}
            showMssage={showMsgSuccessed}
          />
        )
      )}

      <Modal.Header>Order Details</Modal.Header>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant={"danger"}>{error}</Alert>
      ) : (
        order && (
          <Modal.Body id={"#order-details"}>
            <Modal.Title>Items</Modal.Title>
            <Table striped>
              <thead>
                <tr>
                  <th>name</th>
                  <th>Price</th>
                  <th>quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.order_items.map((item) => (
                  <tr key={item.id}>
                    <th>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/product-details/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </th>
                    <th>{item.price}</th>
                    <th>{item.quantity}</th>
                  </tr>
                ))}
              </tbody>
            </Table>
            <span>Total Price : ${order.total_price}</span>

            <span className={" d-block mt-2"}>
              Order Date :{" "}
              {format(order.created, "dd MMM yyyy, hh:mm a", {
                locale: enUS,
              })}
            </span>
          </Modal.Body>
        )
      )}
      <Modal.Footer>
        {loadingDeliver ? (
          <Loader title={"Please wait..."} />
        ) : (
          <div>
            {isAdmin
              ? loading
                ? ""
                : error
                ? ""
                : order && (
                    <Button
                      variant={"primary"}
                      onClick={() => {
                        handelDeliver(order.is_paid, order.id);
                      }}
                    >
                      Shipping
                    </Button>
                  )
              : loading
              ? ""
              : !error &&
                order && (
                  <Link className={"btn btn-primary"} to={`/paid/${order.id}`}>
                    Paid
                  </Link>
                )}
            <Button variant={"danger mx-3"} onClick={handelClose}>
              Close
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default OrderDetails;
