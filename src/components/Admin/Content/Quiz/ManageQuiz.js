import Select from "react-select";
import "./ManageQuiz.scss";
import { useEffect, useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalEditQuiz from "./ModalEditQuiz";
import ModalDelete from "./ModalDelete";
import QuizQA from './QuizQA';
import AssignQuiz from "./AssignQuiz";

const options = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];
const MagageQuiz = (props) => {
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
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [name, setName] = useState("");
  const [description, setDecription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    //validate
    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!description) {
      toast.error("Description is required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    // console.log("log res", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDecription("");
      setImage(null);
      // Sau khi thêm xong, tăng key để Table load lại
      fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };
  const handleClickUpdateQuiz = (item) => {
    setShowModalUpdateQuiz(true);
    setDataUpdate(item);
  };
  const handleClickDeleteQuiz = (item) => {
    setShowModalDeleteQuiz(true);
    setDataDelete(item);
  };
  return (
    <div className="quiz-contaier">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Magage Quiz</Accordion.Header>
          <Accordion.Body>
            <section className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add new Quiz:
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="your quiz name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="decription..."
                    value={description}
                    onChange={(event) => setDecription(event.target.value)}
                  />
                  <label htmlFor="floatingPassword">Decription</label>
                  <div className="my-3">
                    <Select
                      defaultValue={type}
                      onChange={setType}
                      // onChange={this.handleChange}
                      options={options}
                    />
                  </div>
                </div>
                <div className="more-actions form-group">
                  <label className="mb-1">Upload image </label> <br />
                  <input
                    className="form control"
                    type="file"
                    onChange={(event) => handleChangeFile(event)}
                  />
                </div>
                <div>
                  <button
                    className="btn btn-warning mt-3"
                    onClick={handleSubmitQuiz}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </section>
                  <div className="list-detail">
        <TableQuiz
          listQuiz={listQuiz}
          handleClickUpdateQuiz={handleClickUpdateQuiz}
          handleClickDeleteQuiz={handleClickDeleteQuiz}
        />
      </div>

            
          </Accordion.Body>
        </Accordion.Item>
         <Accordion.Item eventKey="1">
          <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA/>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
           <AssignQuiz/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
     
      <ModalEditQuiz
        dataUpdate={dataUpdate}
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        fetchQuiz={fetchQuiz}
      />
      <ModalDelete
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDelete={dataDelete}
        fetchQuiz={fetchQuiz}
      />
    </div>
  );
};
export default MagageQuiz;
