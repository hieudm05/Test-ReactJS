import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
// import React, { useState } from 'react'
// import {
//   CCollapse,
//   CContainer,
//   CDropdown,
//   CDropdownDivider,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
//   CNavbar,
//   CNavbarBrand,
//   CNavbarNav,
//   CNavbarToggler,
//   CNavItem,
//   CNavLink,
// } from '@coreui/react'

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Quiz eszy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/users" className="nav-link">Users</Link>
            <Link to="/admin" className="nav-link">Admin</Link>
          </Nav>
          <Nav>
          <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Logout
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

