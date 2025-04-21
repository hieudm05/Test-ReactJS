import React, { useState } from "react";
import SideBar from "./SideBar";
import { FaBars } from "react-icons/fa";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <section className="admin-container">
        <section className="admin-sidebar">
          <SideBar collapsed={collapsed} />
        </section>
        <section className="admin-content">
          <div className="admin-header">
            <FaBars
              className="admin-icon"
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
          </div>
          <section className="admin-main">
            <Outlet />
          </section>
        </section>
      </section>
    </>
  );
};
export default Admin;
