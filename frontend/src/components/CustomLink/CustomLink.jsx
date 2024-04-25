import React from "react";
import "./CustomLink.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
const CustomLink = (props) => {
  const resolvedPath = useResolvedPath(props.to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className="links">
      <Link className={isActive && "active"} to={props.to}>
        {props.children}
      </Link>
    </li>
  );
};

export default CustomLink;
