import React from "react";
import { SideBarAdmin, HeaderAdmin, Content } from "../components/index";

function AdminScreen() {
  return (
    <div id="dashboard">
      <div className="d-flex">
        <SideBarAdmin />
        <div className="content-admin">
          <HeaderAdmin />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default AdminScreen;
