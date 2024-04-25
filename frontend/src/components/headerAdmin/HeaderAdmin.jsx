import React, { useEffect, useState } from "react";
import "./HeaderAdmin.css";
import S from "./../../images/avater-1.png";
import { Notification, MessageBox } from "../index.js";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../../redux/actions/productActions";
import { getMessages } from "../../redux/actions/orderActions";
import { getUserDetails } from "../../redux/actions/userActions";
const HeaderAdmin = () => {
  const dispacth = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: user } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, userInfo } = userDetails;

  const notifyList = useSelector((state) => state.notifyList);
  const {
    loading: loadingNotify,
    error: errorNotify,
    notifications,
  } = notifyList;

  const messageList = useSelector((state) => state.messageList);
  const {
    loading: loadingMessages,
    error: errorMessages,
    messages,
  } = messageList;

  useEffect(() => {
    dispacth(getUserDetails(user.id));
  }, [user, dispacth]);

  useEffect(() => {
    dispacth(getNotification());
  }, []);
  useEffect(() => {
    dispacth(getMessages());
  }, []);

  const [openNotify, setOpenNotify] = useState(false);
  const [openMessageBox, setOpenMessageBox] = useState(false);

  const handelOpenNotify = () => {
    setOpenNotify(true);
  };

  const handelCloseNotify = () => {
    setOpenNotify(false);
  };

  const handelOpenMessageBox = () => {
    setOpenMessageBox(true);
  };

  const handelCloseMessageBox = () => {
    setOpenMessageBox(false);
  };

  return (
    <div
      id="header-admin"
      className="d-flex align-items-center justify-content-between"
    >
      <Notification
        open={openNotify}
        handelClose={handelCloseNotify}
        loading={loadingNotify}
        error={errorNotify}
        notifications={notifications}
      />

      <MessageBox
        open={openMessageBox}
        handelClose={handelCloseMessageBox}
        loading={loadingMessages}
        error={errorMessages}
        messages={messages}
      />

      {loadingNotify
        ? ""
        : notifications && <div className={"notify-bubbel"}></div>}
      {loadingMessages
        ? ""
        : messages && <div className={"message-bubbel"}></div>}

      <div className="icons">
        <i className="fa fa-envelope" onClick={handelOpenMessageBox}></i>
        <i className="fa fa-bell" onClick={handelOpenNotify}></i>
      </div>
      <div className="d-flex align-items-center">
        {loading
          ? ""
          : error
          ? "Error in "
          : userInfo && (
              <>
                <span>{userInfo.name}</span>
                <img src={userInfo.avatar} alt="" />
              </>
            )}
      </div>
    </div>
  );
};

export default HeaderAdmin;
