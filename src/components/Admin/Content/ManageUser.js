import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

const MagageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser ] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">
        <h1>Manage Users</h1>
      </div>
      <div className="users-content">
        <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}> <FcPlus /> Add User</button>
      </div>
      <div className="table-users-container">
        table users
      </div>
      <ModalCreateUser 
      show={showModalCreateUser}
      setShow = {setShowModalCreateUser}
       />
    </div>
  );
};
export default MagageUser;
