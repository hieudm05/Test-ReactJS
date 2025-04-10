import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
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
    <Navbar expand="lg" className="bg-body-tertiary z-2 pt-4">
      <Container>
        {/* <Navbar.Brand href="#home">Quiz eszy</Navbar.Brand> */}
        <NavLink  to="/" className="navbar-brand">Quiz eszy</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink  to="/" className="nav-link">Home</NavLink>
            <NavLink  to="/users" className="nav-link">Users</NavLink>
            <NavLink to="/admin" className="nav-link">Admin</NavLink>
          </Nav>
          <Nav className=''>
          <button className='btn btn-outline-dark px-3' style={{height: '40px'}}>Log in</button>
          <button className='btn btn-dark px-3 ms-3'>Sign up</button>
          {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Logim</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

