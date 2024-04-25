import React, { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrderDetails,
  getOrderList,
} from "../../../redux/actions/orderActions";
import {
  BoxDashboard,
  ConfirmMessage,
  DataTabel,
  Loader,
  OrderDetails,
} from "../../index";

function Orders() {
  const sortParams = [
    { id: 1, name: "Total Price (min)", value: "min-total_price" },
    { id: 2, name: "Total Price  (max)", value: "max-total_price" },
    { id: 3, name: "Created Date", value: "create-date" },
    { id: 5, name: "Item Count (max)", value: "max-item-count" },
    { id: 6, name: "Item Count (min)", value: "min-item-count" },
  ];
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    loading: loadingDetails,
    error: erorrDetails,
    success: successDetails,
  } = orderDetails;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: erorrDelete,
    success: successDelete,
  } = orderDelete;

  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmMsg, setShowConfirmMsg] = useState(false);
  const [id, setId] = useState(null);
  const [filterData, setFilterData] = useState({
    keysearch: "",
    paid: "",
    sort: "",
    size: 15,
    pageNumber: 1,
  });

  useEffect(() => {
    orders && dispatch(getOrderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrderList());
  }, [successDelete]);

  useEffect(() => {
    handelFilter(
      filterData.keysearch,
      filterData.sort,
      filterData.paid,
      filterData.size,
      filterData.pageNumber
    );
  }, [filterData]);

  function handelGetDetails(id) {
    dispatch(getOrderDetails(id));
  }

  function handelTable() {
    return (
      <div>
        {loading ? (
          <Loader title={"Loading..."} />
        ) : error ? (
          <Alert variant={"danger"}>{error}</Alert>
        ) : orders.length ? (
          <Table style={{ width: "100%" }} striped>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>items Count</th>
                <th>Total price</th>
                <th>Is Paid</th>
                <th>Is Delivered</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    {order.user === null
                      ? order.shipping_address.full_name
                      : order.user}
                  </td>
                  <td>{order.order_items.length}</td>
                  <td>${order.total_price}</td>
                  <td>{order.is_paid ? "Yes" : "No"}</td>
                  <td>{order.is_delivered ? "Yes" : "No"}</td>
                  <td>
                    {" "}
                    <i
                      className="fa fa-eye"
                      onClick={() => {
                        handelGetDetails(order.id);
                        setShowDetails(true);
                      }}
                    ></i>
                    <i
                      className="fa fa-trash"
                      onClick={() => {
                        setShowConfirmMsg(true);
                        setId(order.id);
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
      <Form onChange={handelChange}>
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
              <Form.Label>Filter :</Form.Label>
              <Form.Control as="select" name="paid">
                <option value={""}>-- Select --</option>
                <option value="True">Order Paid</option>
                <option value="Fales">Order Not Paid</option>
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

  const handelChange = (event) => {
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
      dispatch(getOrderList(newLink));
    }
  };

  const handelFilter = (keyword, sort, paid, size, pageNumber) => {
    dispatch(
      getOrderList(
        `?keysearch=${keyword
          .trim()
          .toLowerCase()}&page=${pageNumber}&sort=${sort}&is-paid=${paid}&page-size=${size}`
      )
    );
  };

  const handelDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  const handelCloseMessage = () => {
    setShowConfirmMsg(false);
  };

  const handelCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div>
      <OrderDetails
        isAdmin={true}
        showDetails={showDetails}
        handelClose={handelCloseDetails}
        orderDetails={orderDetails}
      />
      <ConfirmMessage
        showConfirmMsg={showConfirmMsg}
        title={"Delete Order"}
        message={`Are you sure to delete this order? `}
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
          title={"Today Profite"}
          icon={"dollar"}
          money={"4523"}
          color={"#4dbd74"}
        />
        <BoxDashboard
          title={"Today Profite"}
          icon={"dollar"}
          money={"4523"}
          color={"#4dbd74"}
        />
        <BoxDashboard
          title={"Today Profite"}
          icon={"dollar"}
          money={"4523"}
          color={"#4dbd74"}
        />
        <BoxDashboard
          title={"Today Profite"}
          icon={"dollar"}
          money={"4523"}
          color={"#4dbd74"}
        />
      </Row>
      <Row>
        <DataTabel
          table={handelTable()}
          dataList={orderList}
          filterInput={InputFilters()}
          handelChangePage={handelChangePage}
          handelNextOrPreviousPage={handelNextOrPreviousPage}
        />
      </Row>
    </div>
  );
}

export default Orders;
