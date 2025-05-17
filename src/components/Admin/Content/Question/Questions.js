import { useState } from "react";
import Select from "react-select";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import "./Questions.scss";
const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "questions 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "ans 1",
          isCorrect: false,
        },
      ],
    },
  ]);
  const handleAddRemoveQuestion = (type, id) => {
    // console.log("check id", type, id);
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "questions 1",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      // Cập nhật lại câu hỏi thôi
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    // console.log("check question id", questionId);
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      // Tìm chỉ số index
      let index = questionClone.findIndex((item) => item.id === questionId);
      //Thêm dữ liệu theo index của câu hỏi
      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionClone);
    }
  };
  //   console.log("check question", questions);
  return (
    <div className="question-container">
      <div className="title">Manage Question</div>
      <hr />
      <div className="add-new-question">
        <section className="col-6 form-group">
          <label className="mb-2">Select Quiz: </label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </section>
        <div className="mt-3 mb-2">Add question:</div>
        {questions &&
          questions.length > 0 &&
          questions?.map((question, index) => (
            <section className="q-main mb-4">
              <div className="questions-content">
                <div key={question.id} className="form-floating descripsion">
                  <input
                    type="text"
                    className="form-control"
                    value={question.description}
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">
                    Question {index + 1}'s description
                  </label>
                </div>
                <div className="group-upload">
                  <label>
                    <RiImageAddLine className="label-up" />
                  </label>
                  <input type="file" hidden />
                  <span>0 file is uploaded</span>
                </div>
                <div className="btn-add">
                  <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                    <BsFillPatchPlusFill className="icon-add" />
                  </span>
                  {questions.length > 1 && (
                    <span
                      onClick={() =>
                        handleAddRemoveQuestion("REMOVE", question.id)
                      }
                    >
                      <BsFillPatchMinusFill className="icon-remove" />
                    </span>
                  )}
                </div>
              </div>
              {/* Answer */}
              {question.answers &&
                question.answers.length > 0 &&
                question.answers?.map((answer, index) => (
                  <div key={answer.id} className="answers-content">
                    <input
                      type="checkbox"
                      className="form-check-input iscorrect"
                    />
                    <div className="form-floating answer-name">
                      <input
                        type="text"
                        className="form-control"
                        value={answer.description}
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingInput">Answer {index + 1}:</label>
                    </div>
                    <div className="btn-group">
                      <span
                        onClick={() =>
                          handleAddRemoveAnswer("ADD", question.id, "")
                        }
                      >
                        <AiOutlinePlusCircle className="icon-add" />
                      </span>
                      {question.answers.length > 1 && (
                        <span
                          onClick={() =>
                            handleAddRemoveAnswer(
                              "REMOVE",
                              question.id,
                              answer.id
                            )
                          }
                        >
                          <AiOutlineMinusCircle className="icon-remove" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </section>
          ))}
      </div>
    </div>
  );
};
export default Questions;
