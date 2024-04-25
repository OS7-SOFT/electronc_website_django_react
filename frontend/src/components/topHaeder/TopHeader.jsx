import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import "./TopHeader.css";

const TopHeader = ({ userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  return (
    <div id={"top-header"}>
      <Container
        className={"d-flex justify-content-between flex-wrap text-white"}
      >
        {userInfo && (
          <ul className={"d-flex list-type-none flex-wrap"}>
            <li className="d-flex align-items-center">
              <i className="fa fa-phone"></i>
              <span>{userInfo.phone}</span>
            </li>
            <li className="d-flex align-items-center">
              <i className="far fa-envelope"></i>
              <span>{userInfo.email}</span>
            </li>
            <li className="d-flex align-items-center">
              <i className="fa fa-map-marker"></i>
              <span> {`${userInfo.country} - ${userInfo.city}`}</span>
            </li>
          </ul>
        )}
        <ul className={"d-flex list-type-none flex-wrap"}>
          <li className="d-flex align-items-center ">
            <Link
              to={
                userInfo
                  ? userInfo.is_staff
                    ? `/admin/${userInfo.id}`
                    : `/profile/${userInfo.id}`
                  : "/login/"
              }
            >
              <i className="far fa-user"></i>
              <span>
                {userInfo
                  ? userInfo.is_staff
                    ? "Dashboard"
                    : "Myaccount"
                  : "Login"}
              </span>
            </Link>
          </li>
          {userInfo && (
            <li className="d-flex align-items-center ">
              <Link onClick={handelLogout}>
                <i className="far fa-arrow"></i>
                <span>Logout</span>
              </Link>
            </li>
          )}
        </ul>
      </Container>
    </div>
  );
};

export default TopHeader;
