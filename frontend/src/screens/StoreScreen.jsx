import React, { useEffect, useState } from "react";
import { Col, Container, Row, Alert, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getProductList } from "../redux/actions/productActions";
import { ProductList, CheckBox, Pagination, Loader } from "../components/index";
import { getBrandList } from "../redux/actions/brandActions";

const StoreScreen = () => {
  const sortParams = [
    { id: 7, name: "Name", value: "name" },
    { id: 3, name: "Price (min)", value: "min-new_price" },
    { id: 4, name: "Price (max)", value: "max-new_price" },
    { id: 5, name: "Sold (max)", value: "max-sold_count" },
    { id: 6, name: "Sold (min)", value: "min-sold_count" },
  ];

  const dispatch = useDispatch();

  const brandList = useSelector((state) => state.brandList);
  const { loadingbrand, brands, errorGetbrand } = brandList;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProduct,
    error: errorGetProduct,
    products,
    productsCount,
    nextPage,
    pageCount,
    previousPage,
    pageNumber,
  } = productList;

  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("keysearch");
  const [selectBrands, setSelectBrands] = useState([]);
  const [filterData, setFilterData] = useState({
    brand: "",
    sort: "",
    size: 9,
    pageNumber: 1,
  });

  //get brands
  useEffect(() => {
    brands.length === 0 && dispatch(getBrandList());
  }, [dispatch, brands.length]);

  //get porducts
  useEffect(() => {
    if (search) {
      category !== undefined
        ? dispatch(
            getProductList(
              `?category=${category}&keysearch=${search.trim().toLowerCase()}`
            )
          )
        : dispatch(getProductList(`?keysearch=${search.trim().toLowerCase()}`));
    } else {
      category !== undefined
        ? dispatch(getProductList(`?category=${category}`))
        : dispatch(getProductList());
    }
  }, [dispatch, category, search]);

  //get products after filter
  useEffect(() => {
    let brands = "";
    selectBrands.forEach((brand) => (brands += `&brands=${brand}`));
    handelFilter(
      filterData.sort,
      filterData.size,
      filterData.pageNumber,
      brands
    );
  }, [filterData, selectBrands]);

  //select brand to filter
  const handelCheckBrand = (event) => {
    const { checked, value } = event.target;
    checked
      ? setSelectBrands([...selectBrands, value])
      : setSelectBrands(selectBrands.filter((brand) => brand !== value));
    //when select brand return to page 1
    setFilterData((prevData) => ({
      ...prevData,
      pageNumber: 1,
    }));
  };

  const handelFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
      pageNumber: 1,
    }));
  };

  const handelFilter = (sort, size, pageNumber, brands = null) => {
    if (search) {
      category !== undefined
        ? dispatch(
            getProductList(
              `?keysearch=${search}&page=${pageNumber}&category=${category}&sort=${sort}&page-size=${size}${brands}`
            )
          )
        : dispatch(
            getProductList(
              `?keysearch=${search}&page=${pageNumber}&sort=${sort}&page-size=${size}${brands}`
            )
          );
    } else {
      category !== undefined
        ? dispatch(
            getProductList(
              `?page=${pageNumber}&category=${category}&sort=${sort}&page-size=${size}${brands}`
            )
          )
        : dispatch(
            getProductList(
              `?page=${pageNumber}&sort=${sort}&page-size=${size}${brands}`
            )
          );
    }
  };

  //change page number
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

  return (
    <div id="store" className="my-5">
      <Container>
        {search && (
          <span className={"text-black-50 text-center d-block mb-4"}>
            keyword search by : {search}
          </span>
        )}
        <Row>
          <Col md={"3"} className="mb-4">
            <Form>
              <h6 className={"text-uppercase fw-bold mt-4 mb-3"}>Brands</h6>
              {loadingbrand ? (
                <Loader />
              ) : errorGetbrand ? (
                <span>error in request</span>
              ) : (
                brands.map((brand) => (
                  <CheckBox
                    key={brand.id}
                    brand={brand}
                    handelCheck={handelCheckBrand}
                  />
                ))
              )}
              <label className="text-uppercase ">
                <h6 className={"text-uppercase fw-bold mt-4 mb-3"}>SHOWING</h6>
                <Form.Control
                  as={"select"}
                  className={"mx-0"}
                  name="size"
                  onChange={handelFilterChange}
                >
                  <option value="9">9</option>
                  <option value="18">18</option>
                  <option value="27">27</option>
                </Form.Control>
              </label>
              <h6 className={"text-uppercase fw-bold mt-4 mb-3"}>SORT</h6>
              <Form.Control
                as="select"
                className={"mx-0 w-50"}
                name="sort"
                onChange={handelFilterChange}
              >
                <option value="">-- Select --</option>
                {sortParams.map((params) => (
                  <option key={params.id} value={params.value}>
                    {params.name}
                  </option>
                ))}
              </Form.Control>
            </Form>
          </Col>
          {/* Product list */}
          <Col md={"8"}>
            {loadingProduct ? (
              <div style={{ marginBlock: 200, fontSize: 16 }}>
                <Loader title={"Getting Products..."} />
              </div>
            ) : errorGetProduct ? (
              <Alert variant="danger">{errorGetProduct}</Alert>
            ) : products.length >= 1 ? (
              <ProductList products={products} />
            ) : (
              <Alert variant="info text-center my-5">
                No there any products yet.
              </Alert>
            )}

            <div className="d-flex flex-column flex-md-row justify-content-between  align-items-center">
              <span className="text-uppercase product-number mb-md-0 mb-3">
                SHOWING {products.length} PRODUCTS {productsCount}
              </span>

              <Pagination
                pageCount={pageCount}
                previousPage={previousPage}
                nextPage={nextPage}
                pageNumber={pageNumber}
                handelChangeNumber={handelChangePage}
                handelNextOrPreviousPage={handelNextOrPreviousPage}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StoreScreen;
