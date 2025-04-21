import { useState } from "react";
import "./Login.scss";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    
  }
  return (
    <section className="login-container">
      <section className="header">Don't have an account yet?</section>
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
          <button className="btn-submit" onClick={() => handleLogin()}>Login</button>
        </div>
      </section>
    </section>
  );
};
export default Login;
