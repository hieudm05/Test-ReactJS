import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ShowUserDetail from "./ModalShowUser";
import DeleteUser from "./ModalDeleteUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
// import TableUser from "./TableUser";
import React, { useEffect, useState } from "react";
import { getAllUser,getUserWithPaginate } from "../../../services/apiServices";
import TableUserPaginate from "./TableUserPaginate";

const MagageUser = (props) => {
  const LIMIT_USER = 5;
  const [curentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalShowUser, setShowModalShowUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPaginate(1);
  }, []);
  const fetchListUser = async () => {
    let res = await getAllUser();
    // console.log("check res", res);
    // EC = 0 là trạng thái có dữ liệu
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  const fetchListUserWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    // EC = 0 là trạng thái có dữ liệu
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
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
    //showModalDeleteUser(true);
  };
  // Sau khi mà ấn vào update mà không có thay đổi, thì phải trả về object rỗng thay vì 1 giá trị rỗng
  const resetUpdateUser = () => {
    setDataUpdate({});
  };

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
        {/* <TableUser
          listUser={listUser}
          handleClickUpdateUser={handleClickUpdateUser}
          handleClickShowUser={handleCLickShowUser}
          handleClickDeleteUser={handleClickDeleteUser}
        /> */}
        <TableUserPaginate
          listUser={listUser}
          handleClickUpdateUser={handleClickUpdateUser}
          handleClickShowUser={handleCLickShowUser}
          handleClickDeleteUser={handleClickDeleteUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          pageCount={pageCount}
          curentPage={curentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUser={fetchListUser}
        fetchListUserWithPaginate={fetchListUserWithPaginate}
        curentPage={curentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalUpdateUser
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        dataUpdate={dataUpdate}
        fetchListUser={fetchListUser}
        resetUpdateUser={resetUpdateUser}
        fetchListUserWithPaginate={fetchListUserWithPaginate}
        curentPage={curentPage}
        setCurrentPage={setCurrentPage}

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
        fetchListUserWithPaginate={fetchListUserWithPaginate}
        curentPage={curentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default MagageUser;
