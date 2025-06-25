import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  if (!isAuthenticated) {
      return <Navigate to={"/login"}></Navigate>
  }
  return <>{props.children ? props.children : <p>Private Route</p>}</>;
};
export default PrivateRoute;
