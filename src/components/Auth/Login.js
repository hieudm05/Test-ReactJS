import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    //Validate email and password

    //Submit
    let data = await postLogin(email, password);
    console.log("check data", data);
    
    if (data && data.EC === 0) {
      //Login success
      toast.success(data.EM);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      //Login fail
      toast.error(data.EM);
    }
  };
  return (
    <section className="login-container">
      <section className="header">
        <span className="">Don't have an account yet?</span>
        <span className="sign-up">
          <button onClick={() => navigate("/register")}>Sign up</button>
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login
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
export default Login;
