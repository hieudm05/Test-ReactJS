import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import React, { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices";

const MagageUser = () => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetchListUser();
  }, []);
  const fetchListUser = async () => {
    let res = await getAllUser();
    // console.log("check res", res);
    // EC = 0 là trạng thái có dữ liệu
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">
        <h1>Manage Users</h1>
      </div>
      <div className="users-content">
        <button
          className="btn btn-primary"
          onClick={() => setShowModalCreateUser(true)}
        >
          {" "}
          <FcPlus /> Add User
        </button>
      </div>
      <div className="table-users-container">
        <TableUser listUser={listUser} />
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUser={fetchListUser}
      />
    </div>
  );
};
export default MagageUser;
