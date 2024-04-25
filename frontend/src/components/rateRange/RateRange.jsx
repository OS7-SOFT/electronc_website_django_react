import React from "react";
import "./RateRange.css";
import { Stars } from "../index";
import { HandelStars } from "../../utils/helper";
const RateRange = (props) => {
  return (
    <div className={"rate-range"}>
      <div className={"stars d-flex"}>
        {HandelStars(props.range.starCount).map((star) => (
          <Stars key={star.id} rate={star.rate} size="12px" />
        ))}
      </div>
      <div className={"d-flex align-items-center"}>
        <div className={"progress-content"}>
          <div
            className="progress"
            style={{ width: `${props.range.width}` }}
          ></div>
        </div>
        <span>{props.range.rateCount}</span>
      </div>
    </div>
  );
};

export default RateRange;
