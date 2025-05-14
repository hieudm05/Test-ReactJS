import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    // console.log("res all quiz", res);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  return (
    <>
    <div>List Quizzes: </div>
      <table class="table table-hover table-bordred mt-2">
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
                  <button className="btn btn-warning btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
export default TableQuiz;
