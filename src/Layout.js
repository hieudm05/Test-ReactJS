import { BrowserRouter, Route, Router, Routes,useParams } from "react-router-dom";
import App from './App';
// import Users from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import MagageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Auth/Register";
import DetailQuiz from "./components/User/DetailQuiz";
import ListQuiz from "./components/User/ListQuiz";
import MagageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";

const NotFound = () => {
 return(
  <div className=" container mt-3 alert alert-danger">
    404.Not found data with your current URL
  </div>
 )
}
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        {/* Router Admin */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<MagageUser />} />
          <Route path="manage-quiz" element={<MagageQuiz />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="*"  element={<NotFound/>} />
      </Routes>


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
    </>
  );
};
export default Layout;
