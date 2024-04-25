import React from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Stars } from "../index";
import "./RateInfo.css";
function RateInfo(props) {
  return (
    <div id="rate-info">
      <ul>
        <li>
          <div className={"user-info"}>
            <h5>{props.review.user.username}</h5>
            <span>
              {format(props.review.craeted, "dd MMM yyyy, hh:mm a", {
                locale: enUS,
              })}
            </span>
            <ul className={"d-flex"}>
              <Stars value={props.review.rating} size="12px" />
            </ul>
          </div>
          <div className="comment">
            <p>{props.review.comment}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default RateInfo;
