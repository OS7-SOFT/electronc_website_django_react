import React, { createContext, useEffect } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import {
  AddressInfo,
  Loader,
  OrderList,
  CustomMessage,
} from "../components/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/actions/orderActions";
import { clearCart } from "../redux/actions/cartAction";
import { useNavigate } from "react-router";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";

export const AddressContext = createContext();

const CheckoutScreen = () => {
  //
  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success } = orderCreate;

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const [items, setItems] = useState([]);
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    country: "",
    zip_code: "",
    phone: "",
  });

  //get items
  useEffect(() => {
    const orderItems = cartItems.map((item) => {
      return {
        productId: item.id,
        quantity: item.qty,
      };
    });
    setItems(orderItems);
  }, [cartItems]);

  //set shippingAddress
  useEffect(() => {
    shippingAddress && setAddressData(shippingAddress);
  }, []);

  //clac total price
  function handelTotalPrice(items) {
    let total = 0;
    items.map((item) => (total += item.new_price * item.qty));
    return total;
  }

  //route to home after order created successed
  const navigate = useNavigate();
  function handelSuccessed() {
    dispatch(clearCart());
    dispatch({ type: ORDER_CREATE_RESET });
    navigate("/");
  }

  useEffect(() => {
    success &&
      setTimeout(() => {
        handelSuccessed();
      }, 3000);
  }, [success]);

  //Validate inputs
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      cartItems.length > 0 &&
        dispatch(createOrder(addressData, items, handelTotalPrice(cartItems)));
    }
    setValidated(true);
  };

  return (
    <div id="checkout" className="my-5">
      <Container>
        {loading ? (
          ""
        ) : error ? (
          <CustomMessage
            title="Craeted falid"
            message={error}
            showMssage={true}
            haveButton={"close"}
          />
        ) : (
          success && (
            <CustomMessage
              title="Craeted Successfully"
              message={
                "order ctreated has been Successfully show your order in your profile"
              }
              showMssage={true}
            />
          )
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col lg="7">
              <h3 className={"text-uppercase mb-3 fw-bold"}>Billing Address</h3>
              <AddressContext.Provider
                value={{ setAddressData, shippingAddress, addressData }}
              >
                <AddressInfo />
              </AddressContext.Provider>
            </Col>
            <Col lg="5">
              <div className="order-details pt-4 px-4">
                <h3 className={"fw-bold text-uppercase text-center mb-4"}>
                  your order
                </h3>
                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <strong>Producs</strong>
                  </div>
                  <div>
                    <strong>quantity</strong>
                  </div>
                  <div>
                    <strong>Price</strong>
                  </div>
                </div>
                {/* Set orders */}
                {cartItems.map((order) => (
                  <OrderList key={order.id} order={order} />
                ))}
                <hr className="my-1" />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div className="total-price">
                    <strong>${handelTotalPrice(cartItems)}</strong>
                  </div>
                </div>
                <div>
                  <span className="mt-2 d-block fs-5">Notes</span>
                  {cartItems.length >= 1 ? (
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Temporibus assumenda, excepturi sequi maiores suscipit
                      eius natus laborum possimus dolores, quod veritatis
                      deserunt magnam nobis eum sed ut dignissimos! Quasi,
                      exercitationem!
                    </p>
                  ) : (
                    <p className={`text-danger`}>
                      You don't have any product in your cart
                      <br />
                      Please fill your cart and try agine
                    </p>
                  )}
                  {loading ? (
                    <Loader title={"Please wait...."} />
                  ) : (
                    <button className="w-100 text-uppercase mb-3">
                      Place order
                    </button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CheckoutScreen;
