import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
import Language from './../Header/Language';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    //Validate email and password
    setLoading(true);
    //Submit
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      //Login success
      dispatch(doLogin(data));
      toast.success(data.EM);
      setLoading(false);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      //Login fail
      toast.error(data.EM);
      setLoading(false);
    }
  };
  const handleKeyDown = (event) => {
   if(event && event.key === "Enter"){
      handleLogin();
   }
  }
  return (
    <section className="login-container">
      <section className="header">
        <span className="">Don't have an account yet?</span>
        <span className="sign-up">
          <button onClick={() => navigate("/register")}>Sign up</button>
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
            onKeyDown={(event) => handleKeyDown(event)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            className="btn-submit"
            onClick={() => handleLogin()}
            disabled={loading}
          >
            Login
            {loading === true && <ImSpinner10 className="loaderIcon" />}
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
