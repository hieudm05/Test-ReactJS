import React, { useState } from "react";
import SideBar from "./SideBar";
import { FaBars } from "react-icons/fa";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </section>
    </>
  );
};
export default Admin;
