import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';

const MagageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="title">
        <h1>Manage Users</h1>
      </div>
      <div className="users-content">
        <button className="btn btn-success"> + Add User</button>
      </div>
      <div>
      </div>
        <ModalCreateUser />
    </div>
  );
};
export default MagageUser;
