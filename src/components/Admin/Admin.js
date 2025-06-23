import React, { useState } from "react";
import SideBar from "./SideBar";
import { FaBars } from "react-icons/fa";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Language from "../Header/Language";

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
            <span
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              {" "}
              <FaBars className="leftside" />
            </span>
            <div className="admin-header-right">
              <span>
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>Logim</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                <NavDropdown.Item>Log out</NavDropdown.Item>
              </NavDropdown>
              </span>
              <span>
              <Language />
              </span>
            </div>
          </div>
          <section className="admin-main">
            <PerfectScrollbar>
              <Outlet />
            </PerfectScrollbar>
          </section>
        </section>
      </section>
    </>
  );
};
export default Admin;
