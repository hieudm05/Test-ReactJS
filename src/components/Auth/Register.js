import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./Register.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiServices";
import Language from "../Header/Language";
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const hanleSubmitRegister = async () => {
    //Validate
    const isValidateEmail = validateEmail(email);
    if (!isValidateEmail) {
      toast.error("Email is invalid");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    let data = await postRegister(email, username, password, role);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <section className="register-container">
      <section className="header">
        <span className="">Already have an account?</span>
        <span className="sign-up">
          <button onClick={() => navigate("/login")}>Login</button>
        </span>
        <span>
          <Language />
        </span>
      </section>
      <section className="title col-4 mx-auto"> Minh Hieu</section>
      <section className="welcome col-4 mx-auto">Hello, who is this?</section>
      <section className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>UserName</label>
          <input
            type="text"
            className="form-control"
            placeholder="Confirm Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form-group position-password">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input type="hidden" value={role} onChange={(e) => setRole(e.target.value)} />
          <span onClick={() => setShowPassword(!showPassword)}>
            {" "}
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div>
          <button className="btn-submit" onClick={() => hanleSubmitRegister()}>
            Register
          </button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            &#60;&#60; Go to Homepage
          </span>
        </div>
      </section>
    </section>
  );
};
export default Register;
