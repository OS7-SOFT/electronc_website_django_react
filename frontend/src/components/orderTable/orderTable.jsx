import React, { useEffect, useState } from "react";
import "./orderTable.css";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Table } from "react-bootstrap";
import { ConfirmMessage, OrderDetails } from "../index";
import { deleteOrder, getOrderDetails } from "../../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../../redux/constants/orderConstants";
function BasicTable({ title, data, updateOrders }) {
  const dispatch = useDispatch();

  const orderDelete = useSelector((state) => state.orderDelete);
  const { loading, success, error } = orderDelete;

  const orderDetails = useSelector((state) => state.orderDetails);

  const [showConfirmMsg, setShowConfirmMsg] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [id, setId] = useState(null);

  const handelDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, id]);

  useEffect(() => {
    showDetails && dispatch(getOrderDetails(id));
  }, [dispatch, id, showDetails]);

  const handelCloseMessage = () => {
    setShowConfirmMsg(false);
  };
  const handelCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <Col lg={"6"} className="basic-table mb-2 mb-lg-0 ">
      <ConfirmMessage
        showConfirmMsg={showConfirmMsg}
        title={"Delete Order"}
        message={"Are you sure to delete this order ? "}
        isloading={loading}
        error={error}
        isSuccess={success}
        handelClose={handelCloseMessage}
        handelClick={() => {
          handelDelete(id);
        }}
      />
      <OrderDetails
        showDetails={showDetails}
        handelClose={handelCloseDetails}
        orderDetails={orderDetails}
      />
      <Card className="p-3 ">
        <div className="overflow-auto">
          <h4 style={{ color: "#6e6e6e" }}>{title}</h4>
          <Table style={{ backgroundColor: "white", width: "100%" }} striped>
            <thead>
              <tr>
                <th>Product Count</th>
                <th>Total Price</th>
                <th>Date</th>
                <th>operations</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order.id} data-order-id={order.id}>
                  <td>{order.order_items.length}</td>
                  <td>{order.total_price}</td>
                  <td>
                    {format(order.created, "dd MMM yyyy, hh:mm a", {
                      locale: enUS,
                    })}
                  </td>
                  <td>
                    <i
                      className={"fa fa-eye"}
                      onClick={() => {
                        setShowDetails(true);
                        setId(order.id);
                      }}
                    ></i>
                    <i
                      className={"fa fa-trash"}
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
        </div>
      </Card>
    </Col>
  );
}

export default BasicTable;
