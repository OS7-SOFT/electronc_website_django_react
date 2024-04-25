import React, { useState, useContext } from "react";
import "./SideBarAdmin.css";
import LOGO from "./../../images/logo.png";
import { MenuItem } from "./../index";
import { AdminContent } from "../../App";
import { Link } from "react-router-dom";
function SideBarAdmin() {
  const [menuItems, setMenuItems] = useState([
    { id: 1, isActive: true, name: "Dashboard", icon: "dashboard" },
    { id: 2, isActive: false, name: "Clients", icon: "users" },
    { id: 3, isActive: false, name: "Products", icon: "inbox" },
    { id: 5, isActive: false, name: "orders", icon: "tags" },
    { id: 4, isActive: false, name: "shipping", icon: "truck" },
  ]);

  const { setCurrentContent } = useContext(AdminContent);

  const handelActive = (name) => {
    setCurrentContent(name);
    setMenuItems((prev) => {
      return prev.map((item) => {
        return item.name === name
          ? { ...item, isActive: true }
          : { ...item, isActive: false };
      });
    });
  };

  return (
    <div id="sidebar-admin">
      <div className="logo mx-4 mt-2">
        <Link to={"/"}>
          <img src={LOGO} alt="LOGO" className="w-100" />
        </Link>
      </div>
      <div className="main-menu">
        <ul className="mt-4 text-white">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              name={item.name}
              icon={item.icon}
              isActive={item.isActive}
              handelClick={handelActive}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBarAdmin;
