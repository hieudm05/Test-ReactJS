import { useState } from "react";
import Select from "react-select";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";


import "./Questions.scss";
const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  return (
    <div className="question-container">
      <div className="title">Manage Question</div>
      <div className="add-new-question">
        <section className="col-6 form-group">
          <label>Select Quiz: </label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </section>
        <div className="mt-3">Add question:</div>
        <section className="">
          <div className="questions-content">
            <div className="form-floating descripsion">
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Description</label>
            </div>
            <div className="group-upload">
              <label className="label-up">Update Imgage</label>
              <input type="file" hidden />
              <span>0 file is uploaded</span>
            </div>
            <div className="btn-add">
              <span>
                <BsFillPatchPlusFill className="icon-add" />
              </span>
              <span>
                <BsFillPatchMinusFill className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input type="checkbox" className="form-check-input iscorrect" />
            <div className="form-floating answer-name">
              <input
                type="text"
                className="form-control"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Answer 1</label>
            </div>
             <div className="btn-group">
              <span>
                <AiOutlinePlusCircle className="icon-add" />
              </span>
              <span>
                <AiOutlineMinusCircle className="icon-remove" />
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Questions;
