import "./CustomerInfo.css";
import React from "react";
import { Alert, Card } from "react-bootstrap";
import { Loader } from "../index";
import { useNavigate } from "react-router-dom";
const CustomerInfo = ({ loading, error, userInfo }) => {
  const navigate = useNavigate();

  return loading ? (
    <Loader title={"Getting info...."} />
  ) : (
    <Card className="p-3">
      {error ? (
        <Alert variant={"danger"}>Error in request reload page</Alert>
      ) : (
        userInfo && (
          <div id="customer-info">
            <div className="user-box text-center">
              <div className="avatar">
                <img alt="avatar" src={userInfo.avatar} />
              </div>
              <span className="d-block mt-3 mb-2">{userInfo.username}</span>
              <h4 className="mb-1">{userInfo.name}</h4>
              <span className="fs-6">{userInfo.email}</span>
            </div>
            <div className="shpping-info">
              <span className="order-count d-block">
                Country : <span>{userInfo.country}</span>
              </span>
              <span className="order-count d-block">
                City : <span>{userInfo.city}</span>
              </span>
              <span className="order-count d-block mt-2">
                orders : <span>{userInfo.orders.length}</span>
              </span>
              <span className="amount-paid d-block mt-2">
                amount paid : <span className="money ">$3600</span>
              </span>
            </div>
            <button
              className=" mt-4"
              onClick={() => {
                navigate("/update-profile/");
              }}
            >
              Edit Profile
            </button>
          </div>
        )
      )}
    </Card>
  );
};

export default CustomerInfo;
