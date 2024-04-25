import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductList } from "../../redux/actions/productActions";
import "./Pagination.css";

function Pagination({
  pageCount,
  handelChangeNumber,
  nextPage,
  previousPage,
  pageNumber,
  handelNextOrPreviousPage,
}) {
  const [pageActive, setPageActive] = useState(1);

  useEffect(() => {
    setPageActive(pageNumber);
  }, [pageNumber]);

  const handelPages = (num) => {
    let pages = [];
    for (let i = 1; i <= num; i++) {
      const ele = (
        <li
          key={i}
          className={` page-number ${parseInt(pageActive) === i && "active"}`}
          onClick={() => {
            handelChangeNumber(i);
            setPageActive(i);
          }}
        >
          {i}
        </li>
      );
      pages.push(ele);
    }
    return pages;
  };

  return (
    <div id={"pagination"} className="d-flex align-items-center">
      {previousPage && (
        <span
          onClick={() => {
            handelNextOrPreviousPage(previousPage);
          }}
        >
          Previous
        </span>
      )}
      <ul className={"d-flex m-0 mx-2"}>
        {handelPages(pageCount).map((ele) => ele)}
      </ul>
      {nextPage && (
        <span
          onClick={() => {
            handelNextOrPreviousPage(nextPage);
          }}
        >
          Next
        </span>
      )}
    </div>
  );
}

export default Pagination;
