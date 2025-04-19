import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ShowUserDetail from "./ModalShowUser";
import DeleteUser from "./ModalDeleteUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import React, { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices";

const MagageUser = () => {
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
  const handleClickUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
    // console.log("user", user);
  };
  const handleCLickShowUser = (user) => {
    // console.log("check data", user);
    setShowModalShowUser(true);
    setDataUpdate(user);
  };
  const handleClickDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
    // showModalDeleteUser(true);
  };
  // Sau khi mà ấn vào update mà không có thay đổi, thì phải trả về object rỗng thay vì 1 giá trị rỗng
  const resetUpdateUser = () => {
    setDataUpdate({});
  };
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalShowUser, setShowModalShowUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [listUser, setListUser] = useState([]);
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
        <TableUser
          listUser={listUser}
          handleClickUpdateUser={handleClickUpdateUser}
          handleClickShowUser={handleCLickShowUser}
          handleClickDeleteUser={handleClickDeleteUser}
        />
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUser={fetchListUser}
      />
      <ModalUpdateUser
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        dataUpdate={dataUpdate}
        fetchListUser={fetchListUser}
        resetUpdateUser={resetUpdateUser}
      />
      <ShowUserDetail
        show={showModalShowUser}
        setShow={setShowModalShowUser}
        dataUpdate={dataUpdate}
        resetUpdateUser={resetUpdateUser}
      />
      <DeleteUser 
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        dataDelete={dataDelete}
        fetchListUser={fetchListUser}

        />
    </div>
  );
};
export default MagageUser;
