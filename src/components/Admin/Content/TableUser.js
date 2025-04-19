const TableUser = (props) => {
  const { listUser } = props;
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary mx-2"
                    onClick={() => props.handleClickShowUser(item)}
                    >View
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => props.handleClickUpdateUser(item)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                Not found data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
