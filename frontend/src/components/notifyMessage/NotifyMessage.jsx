import React from "react";
import "./NotifyMessage.css";
const NotifyMessage = ({ title, message }) => {
  return (
    <div id={"notify"}>
      <span className="title mb-2 d-block">{title}</span>
      <p>{message}</p>
      {/* <div className={"text-end"}>
        <span>delete</span>
        <span>readed</span>
      </div> */}
    </div>
  );
};

export default NotifyMessage;
