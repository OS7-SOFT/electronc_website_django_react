import React, { useEffect, useState } from "react";
import "./CenterHaeder.css";
import Logo from "../../images/logo.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import ToggleHeader from "../ToggleHeader/ToggleHeader";
import { Basket } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategoryList } from "../../redux/actions/categoryActions";
import { clearCart, deleteItemFromCart } from "../../redux/actions/cartAction";
import {
  clearWishlist,
  deleteItemFromWishlist,
} from "../../redux/actions/wishlistAction";
const CenterHeader = ({ userInfo }) => {
  const toggles = [
    { id: 1, icon: "far fa-heart", name: "wishlist" },
    { id: 2, icon: "fa fa-shopping-cart", name: "cart-list" },
    { id: 3, icon: "fa fa-bars", name: "navbar-menu" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categories, error } = categoryList;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    keysearch: "",
  });

  //get categories
  useEffect(() => {
    categories.length === 0 && dispatch(getCategoryList());
  }, [dispatch, categories.length]);

  //open cart and wishlist
  function handelOpenBasket(name) {
    if (name === "cart-list") {
      setOpenCart((prev) => !prev);
      setOpenWishList(false);
    } else {
      setOpenWishList((prev) => !prev);
      setOpenCart(false);
    }
  }
  //set form data in state
  const handelChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handelSearch = (event) => {
    event.preventDefault();
    navigate(
      `/store${formData.category && "/" + formData.category}/?keysearch=${
        formData.keysearch
      }`
    );
  };

  function handelDeleteFromCart(id) {
    dispatch(deleteItemFromCart(id));
  }

  function handelClearCart() {
    dispatch(clearCart());
  }

  function handelDeleteFromWishlist(id) {
    dispatch(deleteItemFromWishlist(id));
  }

  function handelClearWishlist() {
    dispatch(clearWishlist());
  }

  return (
    <div id={"center-header"}>
      <Container>
        <Row className={"align-items-center "}>
          <Col lg={"3"} className={"text-center logo"}>
            <Link to={"/"}>
              <img src={Logo} alt="Logo" />
            </Link>
          </Col>
          <Col lg={"6"}>
            <div className="header-search mb-3 mb-lg-0">
              <Form className="w-100 d-flex align-items-center justify-content-center">
                <select onChange={handelChange} name={"category"}>
                  <option value="">Select Category</option>
                  {loading ? (
                    <option value="">Loading</option>
                  ) : error ? (
                    <option value="">Error in request</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
                <input
                  type="text"
                  required
                  name={"keysearch"}
                  onChange={handelChange}
                  placeholder="Search here..."
                />
                <button onClick={handelSearch}>Search</button>
              </Form>
            </div>
          </Col>
          <Col lg={"3"}>
            <div className={"d-flex align-items-center justify-content-end"}>
              {toggles.map((toggle) => (
                <ToggleHeader
                  key={toggle.id}
                  name={toggle.name}
                  icon={toggle.icon}
                  onClick={handelOpenBasket}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      {/* Cart */}
      <Basket
        userInfo={userInfo}
        open={openCart}
        isCart={true}
        items={cartItems}
        handelDelete={handelDeleteFromCart}
        handelClear={handelClearCart}
        handelClose={handelOpenBasket}
      />

      {/* Wishlist */}

      <Basket
        open={openWishList}
        isCart={false}
        items={wishlistItems}
        handelDelete={handelDeleteFromWishlist}
        handelClear={handelClearWishlist}
      />
    </div>
  );
};

export default CenterHeader;
