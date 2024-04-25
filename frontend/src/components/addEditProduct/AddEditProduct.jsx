import React, { useEffect, useState } from "react";
import "./AddEditProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
} from "../../redux/actions/productActions";
import { getCategoryList } from "../../redux/actions/categoryActions";
import { CustomMessage, Loader } from "..";
import { getBrandList } from "../../redux/actions/brandActions";
import {
  Form,
  Modal,
  InputGroup,
  ModalTitle,
  ModalBody,
  FormLabel,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const AddEditProduct = ({ show, handelClose, isCreate, productDetails }) => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = categoryList;

  const brandList = useSelector((state) => state.brandList);
  const { loading: loadingBrand, error: errorBrand, brands } = brandList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    product: newProduct,
    success: successCreate,
  } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    product: editProduct,
    success: successUpdate,
  } = productUpdate;

  const [showMsg, setShowMsg] = useState(true);
  const [image, setImage] = useState();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    quantity: "",
    new_price: "",
    old_price: "",
    category: null,
    brand: null,
  });

  //get category and brand
  useEffect(() => {
    categories.length === 0 && dispatch(getCategoryList());
    brands.length === 0 && dispatch(getBrandList());
  }, [dispatch]);

  //set current product in productData to update
  useEffect(() => {
    if (!isCreate) {
      setProductData((prevData) => ({
        ...prevData,
        name: productDetails.name,
        description: productDetails.description,
        quantity: productDetails.quantity,
        new_price: productDetails.new_price,
        old_price: productDetails.old_price,
        category: productDetails.category && productDetails.category.id,
        brand: productDetails.brand && productDetails.brand.id,
      }));
    } else {
      setProductData({
        name: "",
        description: "",
        quantity: "",
        new_price: "",
        old_price: "",
        category: null,
        brand: null,
      });
    }
  }, [productDetails, isCreate]);

  //close message successed
  useEffect(() => {
    if (successCreate || successUpdate)
      setTimeout(() => {
        setShowMsg(false);
        setValidated(false);
      }, 800);
  }, [successCreate, successUpdate]);

  //set data when change
  const handelDataChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handelImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  //Create update product
  function handelProduct() {
    parseInt(productData.brand);
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);

    formData.append("quantity", productData.quantity);
    formData.append("new_price", productData.new_price);
    formData.append("old_price", productData.old_price);

    //set image ,category, brand in formdata if not null
    image && formData.append("image_url", image);
    productData.category &&
      formData.append("category_id", productData.category);
    productData.brand && formData.append("brand_id", productData.brand);

    isCreate
      ? dispatch(createProduct(formData))
      : dispatch(updateProduct(productDetails.id, formData));
    setShowMsg(true);
  }

  //Validate inputs
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    form.checkValidity() && handelProduct();

    setValidated(true);
  };

  return (
    <Modal show={show}>
      {loadingCreate || loadingUpdate ? (
        ""
      ) : successCreate || successUpdate ? (
        <CustomMessage
          title={`${isCreate ? "Created" : "Updated"} Successfully`}
          message={`Product ${productData.name} ${
            isCreate ? "Created" : "Updated"
          } has been Successfully`}
          showMssage={showMsg}
        />
      ) : (
        ""
      )}
      <ModalTitle>
        <h4 className="text-center pt-3">
          {isCreate ? "Create Product" : "Edit Product"}
        </h4>
      </ModalTitle>
      <ModalBody>
        {loadingCreate || loadingUpdate ? (
          ""
        ) : errorCreate || errorUpdate ? (
          <Alert variant={"danger"}>{(errorCreate, errorUpdate)}</Alert>
        ) : (
          ""
        )}
        <Form
          onChange={handelDataChange}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Row>
            <Col>
              <Form.Group controlId="validationCustomUsername" className="mb-3">
                <FormLabel>Name</FormLabel>
                <InputGroup hasValidation>
                  <Form.Control
                    name="name"
                    type="text"
                    defaultValue={!isCreate ? `${productDetails.name}` : null}
                    placeholder="Name..."
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Product name is required
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="validationCustomUsername" className="mb-3">
                <FormLabel>Brand</FormLabel>
                <InputGroup hasValidation>
                  <Form.Select
                    name="brand"
                    aria-describedby="inputGroupPrepend"
                    defaultValue={
                      !isCreate
                        ? productDetails.brand && productDetails.brand.id
                        : null
                    }
                  >
                    <option value="">--Select Brand--</option>
                    {loadingBrand ? (
                      <Loader title="Getting Brand" />
                    ) : errorBrand ? (
                      <option value="">error in request</option>
                    ) : (
                      brands &&
                      brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))
                    )}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="validationCustomUsername" className="mb-3">
                <FormLabel>Category</FormLabel>
                <InputGroup hasValidation>
                  <Form.Select
                    name="category"
                    aria-describedby="inputGroupPrepend"
                    defaultValue={
                      !isCreate
                        ? productDetails.category && productDetails.category.id
                        : ""
                    }
                  >
                    <option value="">--Select Category--</option>
                    {loadingCategory ? (
                      <Loader title="Getting Category" />
                    ) : errorCategory ? (
                      <option value="">error in request</option>
                    ) : (
                      categories &&
                      categories.map((category) =>
                        !isCreate &&
                        productDetails.category === category.name ? (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ) : (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        )
                      )
                    )}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel>Descreption</FormLabel>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={2}
                    cols={6}
                    defaultValue={
                      !isCreate
                        ? `${
                            productDetails.description
                              ? productDetails.description
                              : ""
                          }`
                        : ""
                    }
                    placeholder="write description product"
                    aria-describedby="inputGroupPrepend"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="validationCustom05" className="mb-3">
                <FormLabel>Quantity</FormLabel>
                <Form.Control
                  defaultValue={!isCreate ? `${productDetails.quantity}` : ""}
                  name="quantity"
                  type="number"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Product quantity is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom05" className="mb-3">
                <FormLabel>New Price (after discount)</FormLabel>
                <Form.Control
                  name="new_price"
                  type="number"
                  defaultValue={!isCreate ? `${productDetails.new_price}` : ""}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Product Price is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel>
                  Old Price (if you do not have any discounts leave it)
                </FormLabel>
                <Form.Control
                  name="old_price"
                  type="number"
                  defaultValue={!isCreate ? `${productDetails.old_price}` : ""}
                />
              </Form.Group>
              <Form.Group controlId="validationCustomUsername" className="mb-3">
                <FormLabel>Image</FormLabel>
                <InputGroup hasValidation>
                  <Form.Control
                    name="image_url"
                    type="file"
                    placeholder="Choose file format ex:(png , jpg)"
                    onChange={handelImageChange}
                    aria-describedby="inputGroupPrepend"
                  />
                  <Form.Control.Feedback type="invalid">
                    Product image is required
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <div>
            {loadingCreate || loadingUpdate ? (
              <Loader title="Please wait..." />
            ) : (
              <>
                <button>{isCreate ? `Create` : `Edit`}</button>
                <button
                  onClick={() => {
                    handelClose();
                    setValidated(false);
                  }}
                  className="btn btn-outline mx-2"
                  type="button"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddEditProduct;
