import React, { useEffect } from "react";
import { Container, Row, Alert, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct, CategoryBox, Loader } from "../components";
import { addToCart } from "../redux/actions/cartAction";
import { addToWishlist } from "../redux/actions/wishlistAction";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getNewProducts,
  getTopProducts,
} from "../redux/actions/productActions";
import { Link } from "react-router-dom";

const Home = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 400,
    pauseOnHover: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const categories = [
    {
      id: 1,
      title: "Laptop ",
      image: "http://127.0.0.1:8000/static/images/laptops.png",
      url: "/store/Laptops",
      delay: 0,
    },
    {
      id: 2,
      title: "Accessories",
      image: "http://127.0.0.1:8000/static/images/Accessories.png",
      url: "/store/Accessories",
      delay: 0.1,
    },
    {
      id: 3,
      title: "Camera",
      image: "http://127.0.0.1:8000/static/images/camera.png",
      url: "/store/Cameras",
      delay: 0.2,
    },
  ];

  const dispatch = useDispatch();

  const productTop = useSelector((state) => state.productTop);
  const { loading, products, error } = productTop;

  const productNew = useSelector((state) => state.productNew);
  const { newLoading, newProducts, newError } = productNew;

  //get product
  useEffect(() => {
    dispatch(getNewProducts());
    dispatch(getTopProducts());
  }, [dispatch]);

  function handelAddToCart(item) {
    dispatch(addToCart(item, 1));
  }

  function handelAddToWishlist(item) {
    dispatch(addToWishlist(item));
  }

  return (
    <div>
      <section className={"py-5"}>
        <Container>
          <Row>
            {categories.map((category) => (
              <Col key={category.id} md={"6"} sm={"12"} lg={"4"}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    type: "tween",
                    delay: category.delay,
                  }}
                >
                  <CategoryBox
                    title={category.title}
                    image={category.image}
                    url={category.url}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className={"py-5"}>
        <Container>
          <h3 className={"fs-2 mb-3"}>TOP PRODUCTS</h3>
          <div>
            {loading ? (
              <div style={{ marginBlock: 150 }}>
                <Loader title={"Loading top products..."} />
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <Slider {...settings}>
                {products.map((product) => {
                  return (
                    <Col
                      key={product.id}
                      md={"6"}
                      lg={"3"}
                      className={"content"}
                    >
                      <CardProduct
                        product={product}
                        handelAddToCart={() => {
                          handelAddToCart(product);
                        }}
                        handelAddToWishlist={() => {
                          handelAddToWishlist(product);
                        }}
                      />
                    </Col>
                  );
                })}
              </Slider>
            )}
          </div>
        </Container>
      </section>
      <section className={"py-5 image-section"}>
        <div className="image text-center d-flex flex-column align-items-center justify-content-center">
          <h2 className={"fw-bold"}>HOT DEAL THIS WEEK</h2>
          <p>NEW COLLECTION UP TO 50% OFF</p>
          <button>
            <Link to={`/store/`}>SHOP NOW</Link>
          </button>
        </div>
      </section>
      <section className={"py-5"}>
        <Container>
          <h3 className={"fs-2 mb-3"}>NEW PRODUCTS</h3>
          <Row>
            {newLoading ? (
              <div style={{ marginBlock: 150 }}>
                <Loader title={"Loading new products..."} />
              </div>
            ) : newError ? (
              <Alert variant="danger">{newError}</Alert>
            ) : (
              <Slider {...settings}>
                {newProducts.map((product) => {
                  return (
                    <Col
                      key={product.id}
                      md={"6"}
                      lg={"3"}
                      className={"content"}
                    >
                      <CardProduct
                        product={product}
                        handelAddToCart={() => {
                          handelAddToCart(product);
                        }}
                        handelAddToWishlist={() => {
                          handelAddToWishlist(product);
                        }}
                      />
                    </Col>
                  );
                })}
              </Slider>
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
