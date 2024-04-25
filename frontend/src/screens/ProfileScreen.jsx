import React, { useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CustomerInfo, Loader, OrderTable } from "../components/index";
import { getUserDetails } from "../redux/actions/userActions";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, userInfo } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: CurrentUser } = userLogin;

  function handelUpdateOrdersData(id) {
    userInfo.orders.filter((order) => order.id !== id);
  }

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return CurrentUser ? (
    CurrentUser.id == id ? (
      <div id="profile" className="my-5">
        <Container>
          <Row>
            <Col md={"3"}>
              <CustomerInfo
                loading={loading}
                error={error}
                userInfo={userInfo}
              />
            </Col>
            <Col md={"9"}>
              {loading ? (
                <Loader />
              ) : error ? (
                <Alert variant={"danger"}>{error}</Alert>
              ) : (
                userInfo && (
                  <OrderTable title={"Orders"} data={userInfo.orders} />
                )
              )}
            </Col>
          </Row>
        </Container>
      </div>
    ) : (
      <h1 className={" text-center"} style={{ marginBlock: "100px" }}>
        404 No there any Page
      </h1>
    )
  ) : (
    <h1 className={" text-center"} style={{ marginBlock: "100px" }}>
      404 No there any Page
    </h1>
  );
};

export default ProfileScreen;
