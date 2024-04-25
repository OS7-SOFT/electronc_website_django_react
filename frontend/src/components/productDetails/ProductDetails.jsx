import React from "react";
import "./ProductDetails.css";
import { Modal, Button, Alert } from "react-bootstrap";
import { Loader, Stars } from "../index";

const ProductDetails = ({ show, productDetails, handelClose, handelEdit }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id={"modal-product-details"} className={"d-flex"}>
          <div className={"image"}>
            <img className={"w-100"} src={productDetails.image_url} />
          </div>
          <div className={"info"}>
            <div>
              <h4>{productDetails.name}</h4>
              <span className={"d-block mt-1"}>
                Brands:
                <span>
                  {productDetails.brand
                    ? ` ${productDetails.brand.name}`
                    : " Not have"}
                </span>
              </span>
              <span>
                Category:
                <span>
                  {productDetails.category
                    ? ` ${productDetails.category.name}`
                    : " Not have"}
                </span>
              </span>
              <div className={"description"}>
                <p className={"mt-2 "}>{productDetails.description}</p>
              </div>
            </div>
            <div className="d-flex">
              <Stars value={productDetails.rating} />
              <span className={"d-block mx-2"}>
                {productDetails.num_reviews > 1
                  ? `${productDetails.num_reviews} Review(s)`
                  : ""}
              </span>
            </div>
            <div>
              <span>
                New Price : <span> ${productDetails.new_price}</span>
              </span>
              <span className={"d-block"}>
                Old Price : <span> ${productDetails.old_price}</span>
              </span>
              <span>
                Quantity : <span> {productDetails.quantity}</span>
              </span>
              <br />
              <span>
                Sold count : <span> {productDetails.sold_count}</span>
              </span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            handelEdit(productDetails.id);
            handelClose();
          }}
        >
          Edit
        </Button>
        <Button variant="badget" onClick={handelClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetails;
