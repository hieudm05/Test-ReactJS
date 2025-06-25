import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";


const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogOut = async () => {
    const res = await logout(account.email, account.refresh_token);
    if(res && res.EC === 0) {
      // Clear user data in redux
      dispatch(doLogout())
      navigate("/login");
    }else{
      toast.error(res.EM);
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary z-2 pt-4">
      <Container>
        {/* <Navbar.Brand href="#home">Quiz eszy</Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand">
          Quiz eszy
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </Nav>

          <Nav className="">
            {isAuthenticated === false ? (
              <>
                <button
                  className="btn btn-outline-dark px-3"
                  style={{ height: "40px" }}
                  onClick={() => handleLogin()}
                >
                  Log in
                </button>
                <button
                  className="btn btn-dark px-3 ms-3"
                  onClick={() => handleRegister()}
                >
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>Logim</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
              </NavDropdown>
            )}
            <Language/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
