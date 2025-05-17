

const TableQuiz = (props) => {
  const {listQuiz} = props;
  return (
    <>
    <div>List Quizzes: </div>
      <table className="table table-hover table-bordred my-2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((item, index) => (
              <tr key={`table-quiz${index}`}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td className="d-flex inline-flex gap-2">
                  <button className="btn btn-warning btn-sm" onClick={() => props.handleClickUpdateQuiz(item)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => props.handleClickDeleteQuiz(item)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
export default TableQuiz;
