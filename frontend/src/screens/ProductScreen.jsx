import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductDetials,
  getRelatedProducts,
} from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartAction";
import { addToWishlist } from "../redux/actions/wishlistAction";
import {
  CardProduct,
  CustomButton,
  RateInfo,
  RateRange,
  Stars,
  Loader,
} from "../components/index";

const ProductScreen = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: LoadingProduct,
    product,
    error: errorProduct,
  } = productDetails;

  const relatedProducts = useSelector((state) => state.relatedProducts);
  const {
    loading: loadingRelatedProducts,
    error: errorRelatedProducts,
    products,
  } = relatedProducts;

  useEffect(() => {
    dispatch(getProductDetials(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    !LoadingProduct &&
      product &&
      product.category &&
      dispatch(
        getRelatedProducts(
          `category=${product.category.name}&brand=${product.brand.name}`
        )
      );
  }, [dispatch, product, LoadingProduct]);

  const rateRanges = [
    { id: 1, starCount: 5, width: "50%", rateCount: 5 },
    { id: 2, starCount: 4, width: "30%", rateCount: 12 },
    { id: 3, starCount: 3, width: "70%", rateCount: 20 },
    { id: 4, starCount: 2, width: "80%", rateCount: 2 },
    { id: 5, starCount: 1, width: "40%", rateCount: 9 },
  ];

  const [quantity, setQuantity] = useState(1);

  const handelQuantityChange = (event) => {
    const { value } = event.target;
    product.quantity >= value && setQuantity(value);
  };

  function handelAddToCart(item) {
    dispatch(addToCart(item, parseInt(quantity)));
  }
  function handelAddToWishlist(item) {
    dispatch(addToWishlist(item));
  }

  return (
    <>
      <div id="product-details" className="py-5">
        {LoadingProduct ? (
          <Loader />
        ) : errorProduct ? (
          <div style={{ marginBlock: 200, marginInline: "auto", width: 800 }}>
            <Alert variant={"danger text-center"}>{errorProduct}</Alert>
          </div>
        ) : (
          <Container>
            {/* ---------Details Product--------------- */}
            <div className="d-flex flex-column flex-lg-row justify-content-evenly">
              <div className="image">
                <img src={product.image_url} alt={"product"} />
              </div>
              <div className="details ">
                <h5 className="fw-bold">{product.name}</h5>
                <div className="d-flex align-items-center">
                  <ul className="product-rate d-flex align-items-center">
                    {<Stars value={product.rating} size="12px" />}
                  </ul>
                  <span>{product.num_reviews} Review(s)</span>
                </div>
                <h3 className="mt-2">${product.new_price}</h3>
                <p className="text-black-50">{product.description}</p>
                <div className="d-flex flex-column flex-sm-row">
                  <div className="mb-2 mx-0">
                    <Form>
                      <label className="text-uppercase">qty</label>
                      <input
                        name="quantity"
                        type="number"
                        max={product.quantity}
                        onChange={handelQuantityChange}
                      />
                    </Form>
                  </div>
                </div>
                <CustomButton
                  handelClick={() => {
                    handelAddToCart(product);
                  }}
                  name={"Add to cart"}
                  on
                />
                <span
                  className="favorit d-block text-uppercase "
                  onClick={() => {
                    handelAddToWishlist(product);
                  }}
                >
                  Add to wishlist
                </span>
                <span className="mt-2 d-block text-uppercase">
                  Category :
                  <span className="ml-3">
                    {product.category ? `${product.category.name}` : "Not have"}
                  </span>
                </span>
              </div>
            </div>
            {/* -----------------------Reviews--------------------- */}
            <div className="review-title my-4">
              <hr className="text-black-50" />
              <span>Reviews</span>
            </div>
            <Row>
              <Col md={"3"} className={"text-center text-lg-start rate-star"}>
                <div className={"d-flex align-items-center"}>
                  <h3 className={"mr-3 fw-bold"}>4.5</h3>
                </div>
                {rateRanges.map((rate) => (
                  <RateRange key={rate.id} range={rate} />
                ))}
              </Col>
              <Col sm={"12"} lg={"6"} className={"mt-4 comment-box"}>
                {product.reviews.length < 1 ? (
                  <Alert variant={"badget text-center"}>
                    No there any comment
                  </Alert>
                ) : (
                  product.reviews.map((review) => (
                    <RateInfo key={review.id} starCount={5} review={review} />
                  ))
                )}
              </Col>
              <Col lg={"3"}>
                <Form>
                  <textarea
                    maxLength="600"
                    minLength="200"
                    placeholder="Your review"
                  ></textarea>
                  <CustomButton name="Submit" />
                </Form>
              </Col>
            </Row>
            <div className="text-center text-upppercase mt-5 ">
              <h2 className="fw-bold my-4">Related Products</h2>
            </div>
            <Row>
              {loadingRelatedProducts ? (
                <div style={{ marginBlock: 100 }}>
                  <Loader title={"Loading..."} />
                </div>
              ) : errorRelatedProducts ? (
                <Alert variant={"danger"}>{errorRelatedProducts}</Alert>
              ) : (
                products &&
                products.map((product) => (
                  <Col key={product.id} md={"6"} lg={"3"} className={"content"}>
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
                ))
              )}
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

export default ProductScreen;
