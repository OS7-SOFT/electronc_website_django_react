import React, { useEffect, useState } from "react";
import {
  Alert,
  Row,
  Table,
  Button,
  Col,
  Form,
  FormGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductList,
} from "../../../redux/actions/productActions";
import { PRODUCT_DELETE_RESET } from "../../../redux/constants/productConstants";
import {
  BoxDashboard,
  DataTabel,
  AddEditProduct,
  ProductDetails,
  Loader,
  ConfirmMessage,
} from "../../index";

const Product = () => {
  const sortParams = [
    { id: 7, name: "Name", value: "name" },
    { id: 1, name: "Quantity (min)", value: "min-quantity" },
    { id: 2, name: "Quantity (max)", value: "max-quantity" },
    { id: 3, name: "Price (min)", value: "min-new_price" },
    { id: 4, name: "Price (max)", value: "max-new_price" },
    { id: 5, name: "Sold (max)", value: "max-sold_count" },
    { id: 6, name: "Sold (min)", value: "min-sold_count" },
  ];

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {
    loading,
    error,
    products,
    nextPage,
    pageCount,
    previousPage,
    pageNumber,
  } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: erorrDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: erorrCreate,
    success: successCreate,
  } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: erorrUpdate,
    success: successUpdate,
  } = productUpdate;

  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmMsg, setShowConfirmMsg] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState(null);
  const [isCreat, setIsCreat] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [filterData, setFilterData] = useState({
    keysearch: "",
    category: "",
    sort: "",
    size: 15,
    pageNumber: 1,
  });

  //Get Products
  useEffect(() => {
    products && dispatch(getProductList());
  }, [dispatch]);

  useEffect(() => {
    if (successDelete) {
      dispatch(getProductList());
      setTimeout(() => {
        dispatch({ type: PRODUCT_DELETE_RESET });
      }, 3000);
    }
  }, [successDelete]);

  //Close form  after created or deleted
  useEffect(() => {
    if (successUpdate || successCreate) {
      handelFilter(
        filterData.keysearch,
        filterData.sort,
        filterData.category,
        filterData.size,
        1
      );
      setTimeout(() => {
        setShowForm(false);
      }, 800);
    }
  }, [successCreate, successUpdate]);

  useEffect(() => {
    handelFilter(
      filterData.keysearch,
      filterData.sort,
      filterData.category,
      filterData.size,
      filterData.pageNumber
    );
  }, [filterData]);

  function handelGetDetails(id) {
    const product = products.find((product) => product.id === id);
    setProductDetails(product);
  }

  function CheckProductQuantity(product) {
    return product.quantity <= 20
      ? product.quantity >= 10
        ? "bg-warning"
        : "bg-danger"
      : "";
  }

  function handelTable() {
    return (
      <div>
        {loading ? (
          <div style={{ marginBlock: "100px" }}>
            <Loader title={"Loading..."} />
          </div>
        ) : error ? (
          <Alert variant={"danger"}>{error}</Alert>
        ) : products.length ? (
          <Table style={{ width: "100%" }} striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`${CheckProductQuantity(product)}`}
                >
                  <td>{product.name}</td>
                  <td>
                    {product.brand ? `${product.brand.name}` : "Not have"}
                  </td>
                  <td>
                    {product.category ? `${product.category.name}` : "Not have"}
                  </td>
                  <td>${product.new_price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <i
                      className="fa fa-eye"
                      onClick={() => {
                        handelGetDetails(product.id);
                        setShowDetails(true);
                      }}
                    ></i>
                    <i
                      className="fa fa-edit"
                      onClick={() => {
                        handelShowEditForm(product.id);
                      }}
                    ></i>
                    <i
                      className="fa fa-trash"
                      onClick={() => {
                        setShowConfirmMsg(true);
                        setId(product.id);
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className={"my-5"}>
            <Alert className={"text-center"}>No there any Order</Alert>
          </div>
        )}
      </div>
    );
  }

  function InputFilters() {
    return (
      <Form onChange={handelFilterChange}>
        <Row>
          <Col>
            <div>
              <Form.Label>Show :</Form.Label>
              <Form.Control as="select" name="size">
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </Form.Control>
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label>Categories :</Form.Label>
              <Form.Control as="select" name="category">
                <option value="">-- Select --</option>
                <option value="Laptops">Laptops</option>
                <option value="Accessories">Accessories</option>
                <option value="Cameras">Cameras</option>
                <option value="Smartphones">Smartphones</option>
              </Form.Control>
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label>Sort By :</Form.Label>
              <Form.Control as="select" name="sort">
                <option value="">-- Select --</option>
                {sortParams.map((params) => (
                  <option key={params.id} value={params.value}>
                    {params.name}
                  </option>
                ))}
              </Form.Control>
            </div>
          </Col>
          <Col>
            <div className="search">
              <Form.Label>Search :</Form.Label>
              <FormGroup>
                <FormControl
                  type="text"
                  name="keysearch"
                  placeholder="Search keyword"
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  const handelShowEditForm = (id) => {
    setShowForm(true);
    setIsCreat(false);
    handelGetDetails(id);
  };

  const handelFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
      pageNumber: 1,
    }));
  };

  const handelChangePage = (number) => {
    setFilterData((prevData) => ({
      ...prevData,
      pageNumber: number,
    }));
  };

  const handelNextOrPreviousPage = (link) => {
    if (link) {
      const newLink = link.slice(link.indexOf("?"));
      dispatch(getProductList(newLink));
    }
  };

  const handelFilter = (keyword, sort, category, size, pageNumber) => {
    dispatch(
      getProductList(
        `?keysearch=${keyword
          .trim()
          .toLowerCase()}&page=${pageNumber}&sort=${sort}&category=${category}&page-size=${size}`
      )
    );
  };

  const handelDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handelCloseMessage = () => {
    setShowConfirmMsg(false);
  };

  const handelCloseDetails = () => {
    setShowDetails(false);
  };

  const handelCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <AddEditProduct
        show={showForm}
        handelClose={handelCloseForm}
        isCreate={isCreat}
        productDetails={productDetails}
      />
      <ProductDetails
        show={showDetails}
        handelClose={handelCloseDetails}
        handelEdit={handelShowEditForm}
        productDetails={productDetails}
      />
      <ConfirmMessage
        showConfirmMsg={showConfirmMsg}
        title={"Delete Product"}
        message={`Are you sure to delete this product ? `}
        isloading={loadingDelete}
        error={erorrDelete}
        isSuccess={successDelete}
        handelClose={handelCloseMessage}
        handelClick={() => {
          handelDelete(id);
        }}
      />
      <Row>
        <BoxDashboard
          title={"Total Products"}
          icon={"dollar"}
          money={`${!loading && products && products.length}`}
          color={"#4dbd74"}
        />
        <BoxDashboard
          title={"Today Profite"}
          icon={"dollar"}
          money={"4523"}
          color={"#4dbd74"}
        />
      </Row>
      <Button
        onClick={() => {
          setShowForm(true);
          setIsCreat(true);
        }}
        style={{ backgroundColor: "var(--primary-color)", border: "none" }}
      >
        Create
      </Button>
      <Row>
        <DataTabel
          table={handelTable()}
          dataList={productList}
          sortParams={sortParams}
          filterInput={InputFilters()}
          handelChangePage={handelChangePage}
          handelNextOrPreviousPage={handelNextOrPreviousPage}
        />
      </Row>
    </div>
  );
};

export default Product;
