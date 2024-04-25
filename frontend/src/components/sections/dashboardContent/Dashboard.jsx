import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getBadProducts,
  getTopProducts,
} from "../../../redux/actions/productActions";
import { BoxDashboard, BasicTable } from "./../../index";
const Dashboard = () => {
  // const sortParams = [
  //   { id: 1, name: "Quantity (min)", value: "min-quantity" },
  //   { id: 2, name: "Quantity (max)", value: "max-quantity" },
  //   { id: 3, name: "Price (min)", value: "min-new_price" },
  //   { id: 4, name: "Price (max)", value: "max-new_price" },
  //   { id: 5, name: "Sold (max)", value: "max-sold_count" },
  //   { id: 6, name: "Sold (min)", value: "min-sold_count" },
  //   { id: 7, name: "Name", value: "name" },
  // ];

  const dispatch = useDispatch();

  const productBad = useSelector((state) => state.productBad);
  const productTop = useSelector((state) => state.productTop);

  useEffect(() => {
    dispatch(getTopProducts());
    dispatch(getBadProducts());
  }, [dispatch]);

  return (
    <>
      <Row>
        <BoxDashboard
          title={"Today Profits"}
          icon={"dollar"}
          count={"$4523"}
          color={"var(--primary-color)"}
        />
        <BoxDashboard
          title={"Profits for this month"}
          icon={"dollar"}
          count={"$45223"}
          color={"var(--primary-color)"}
        />
        <BoxDashboard
          title={"Profits for this year"}
          icon={"dollar"}
          count={"$224523"}
          color={"var(--primary-color)"}
        />
        <BoxDashboard
          title={"Total Profits"}
          icon={"dollar"}
          count={"$2324523"}
          color={"var(--primary-color)"}
        />
      </Row>

      <Row>
        <BoxDashboard
          title={"Products sold today"}
          icon={"inbox"}
          count={"10"}
          color={"var(--primary-color)"}
        />
        <BoxDashboard
          title={"Products sold this month"}
          icon={"inbox"}
          count={"83"}
          color={"var(--primary-color)"}
        />
        <BoxDashboard
          title={"Products sold this yaer"}
          icon={"inbox"}
          count={"423"}
          color={"var(--primary-color)"}
        />
        <BoxDashboard
          title={"Total Products sold"}
          icon={"inbox"}
          count={"4523"}
          color={"var(--primary-color)"}
        />
      </Row>

      <Row>
        <Col md={"6"}>
          <BasicTable title={"Top Product"} productData={productTop} />
        </Col>
        <Col md={"6"}>
          <BasicTable title={"Bad Product"} productData={productBad} />
        </Col>
      </Row>
      <Row>{/* <DataTabel sortParams={sortParams} /> */}</Row>
    </>
  );
};

export default Dashboard;
