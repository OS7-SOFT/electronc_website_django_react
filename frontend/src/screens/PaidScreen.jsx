import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Alert, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import s from "../images/product03.png";
import { getOrderDetails } from "../redux/actions/orderActions";
import { useParams } from "react-router";
import { CustomMessage, Loader } from "../components";
const PaidScreen = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [paidSuccessed, setPaidSuccessed] = useState(false);

  //Get order details
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  //close message paid successed
  useEffect(() => {
    paidSuccessed &&
      setTimeout(() => {
        setPaidSuccessed(false);
      }, 1000);
  }, [paidSuccessed]);

  //Options for payPal payment
  const initialOptions = {
    "client-id":
      "ATy0Cxe3Y0WlijkxHOgmJbkYDmS6c2szKKZ3GWPQxjfcXY5PaNrlS4L89JeIfxXtsS32ZWJgHvV3VO5n",
    currency: "USD",
  };

  const createOrder = (data, actions, price) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `45.0`,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      setPaidSuccessed(true);
      console.log(details);
    });
  };

  return (
    <>
      <CustomMessage
        title={"Paid Successed"}
        message={"paid has been successfully"}
        showMssage={paidSuccessed}
      />
      <div id={"paid-screen"}>
        <div className="order-details pt-4 px-4">
          <h3 className={"fw-bold text-uppercase text-center mb-2"}>
            your order
          </h3>
          <Row className={"orders-list pb-1"}>
            {loading ? (
              <Loader title={"Getting items..."} />
            ) : error ? (
              <Alert variant={"danger"}>{error}</Alert>
            ) : order ? (
              order.order_items.map((item) => (
                <Col key={item.id} md={"4"}>
                  <Card className={"my-2"}>
                    <Card.Header>
                      <Card.Img src={s} />
                      <Card.Title>{item.name}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Subtitle>Price : ${item.price}</Card.Subtitle>
                      <Card.Subtitle className={"my-3"}>
                        Quantity : {item.quantity}
                      </Card.Subtitle>
                      <Card.Subtitle>
                        Total : ${parseInt(item.price) * item.quantity}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Alert>No there any items</Alert>
            )}
          </Row>
          {loading
            ? ""
            : order && (
                <div className=" py-3 d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Total Price</strong>
                  </div>
                  <div className="total-price">
                    <strong>${order.total_price}</strong>
                  </div>
                </div>
              )}
        </div>
        <div className={"terms mx-auto mt-5"}>
          <h4>Termes And Privacy</h4>
          <div className="terms-box p-3">
            <div className={"term d-flex mb-4"}>
              <h6>1-</h6>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium optio aut expedita quis odit consequuntur ad
                architecto labore laborum sequi deserunt voluptatibus in
                similique modi doloribus repellendus, omnis suscipit. Velit.
              </div>
            </div>{" "}
            <div className={"term d-flex mb-4"}>
              <h6>2-</h6>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium optio aut expedita quis odit consequuntur ad
                architecto labore laborum sequi deserunt voluptatibus in
                similique modi doloribus repellendus, omnis suscipit. Velit.
              </div>
            </div>{" "}
            <div className={"term d-flex mb-4"}>
              <h6>3-</h6>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium optio aut expedita quis odit consequuntur ad
                architecto labore laborum sequi deserunt voluptatibus in
                similique modi doloribus repellendus, omnis suscipit. Velit.
              </div>
            </div>{" "}
            <div className={"term d-flex mb-4"}>
              <h6>4-</h6>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium optio aut expedita quis odit consequuntur ad
                architecto labore laborum sequi deserunt voluptatibus in
                similique modi doloribus repellendus, omnis suscipit. Velit.
              </div>
            </div>{" "}
            <div className={"term d-flex mb-4"}>
              <h6>5-</h6>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium optio aut expedita quis odit consequuntur ad
                architecto labore laborum sequi deserunt voluptatibus in
                similique modi doloribus repellendus, omnis suscipit. Velit.
              </div>
            </div>{" "}
            <div className={"term d-flex mb-4"}>
              <h6>6-</h6>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium optio aut expedita quis odit consequuntur ad
                architecto labore laborum sequi deserunt voluptatibus in
                similique modi doloribus repellendus, omnis suscipit. Velit.
              </div>
            </div>
          </div>
          <Form className={"mt-3"}>
            <InputGroup>
              <Form.Check
                id={"agree-check"}
                onChange={(event) => {
                  setAgreeTerms(event.target.checked);
                }}
              />
              <Form.Label className={"mx-2"} htmlFor={"agree-check"}>
                I agree to all terms
              </Form.Label>
            </InputGroup>
          </Form>
        </div>
        {loading
          ? ""
          : error
          ? ""
          : agreeTerms && (
              <div
                style={{
                  width: 400,
                  marginInline: "auto",
                  marginTop: 10,
                }}
              >
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    style={{ shape: "rect" }}
                    createOrder={(data, action) => {
                      createOrder(data, action, order.total_price);
                    }}
                    onApprove={(data, actions) => {
                      onApprove(data, actions);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
      </div>
    </>
  );
};

export default PaidScreen;
