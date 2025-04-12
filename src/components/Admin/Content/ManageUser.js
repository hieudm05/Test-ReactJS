import ModalCreateUser from "./ModalCreateUser";


const MagageUser = () => {
  return (
    <div className="mage-user-container">
      <div className="title">
        <h1>Manage Users</h1>
      </div>
      <div className="users-content">
        <button className="btn btn-success"> + Add User</button>
      </div>
      <div>
        <ModalCreateUser />
      </div>
    </div>
  );
};
export default MagageUser;
