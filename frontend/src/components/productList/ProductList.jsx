import { motion } from "framer-motion";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { addToWishlist } from "../../redux/actions/wishlistAction";
import { CardProduct, Pagination } from "../index";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  function handelAddToCart(item) {
    dispatch(addToCart(item, 1));
  }

  function handelAddToWishlist(item) {
    dispatch(addToWishlist(item));
  }

  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md="6" lg="4">
            <motion.div
              className={"mb-4"}
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5 }}
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
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
