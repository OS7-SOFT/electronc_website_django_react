import React, { startTransition } from "react";
import "./Stars.css";
function Stars(props) {
  function start(value) {
    let starts = [];
    for (let i = 1; i <= 5; i++) {
      value >= i
        ? starts.push({ id: i, star: "fas fa-star" })
        : value >= i - 0.5
        ? starts.push({ id: i, star: "fas fa-star-half-alt" })
        : starts.push({ id: i, star: "far fa-star" });
    }

    return starts;
  }

  return (
    <div>
      <ul className="d-flex ">
        <li>
          {start(props.value).map((ele) => (
            <i
              key={ele.id}
              style={{ fontSize: `${props.size}` }}
              className={`${ele.star}`}
            ></i>
          ))}
        </li>
      </ul>
    </div>
  );
}

export default Stars;
