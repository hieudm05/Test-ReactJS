import { useState } from "react";
import Select from "react-select";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
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
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
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
  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value;
        setQuestions(questionClone);
      }
    }
  };
  const handleOnChangeFielQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    // console.log("check fiiels ", event.target.files[0].name);

    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
      setQuestions(questionClone);
    }
  };
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => (item.id = questionId));
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        // eslint-disable-next-line array-callback-return
        (answer) => {
          // Những thứ thay đổi
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") answer.description = value;
          }
          // Những cái không thay đổi return ra
          return answer;
        }
      );
      setQuestions(questionClone)
    }
  };
  const handleSubmitQuestionForQuiz = () => {
    console.log("check question", questions);
  }
  // 

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
                    onChange={(event) =>
                      handleOnChange(
                        "QUESTION",
                        question.id,
                        event.target.value
                      )
                    }
                  />
                  <label htmlFor="floatingInput">
                    Question {index + 1}'s description
                  </label>
                </div>
                <div className="group-upload">
                  <label htmlFor={`${question.id}`}>
                    <RiImageAddLine className="label-up" />
                  </label>
                  <input
                    type="file"
                    hidden
                    id={question.id}
                    onChange={(event) =>
                      handleOnChangeFielQuestion(question.id, event)
                    }
                  />
                  <span>
                    {question.imageName && question.imageName.length > 0
                      ? question.imageName
                      : "0 file is uploaded"}
                  </span>
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
                      checked={answer.isCorrect}
                      onChange={(event) =>
                        handleAnswerQuestion(
                          "CHECKBOX",
                          answer.id,
                          question.id,
                          event.target.checked
                        )
                      }
                    />
                    <div className="form-floating answer-name">
                      <input
                        type="text"
                        className="form-control"
                        value={answer.description}
                        placeholder="name@example.com"
                        onChange={(event) =>
                          handleAnswerQuestion(
                            "INPUT",
                            answer.id,
                            question.id,
                            event.target.value
                          )
                        }
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
          {
            questions && questions.length > 0 && 
            <div>
              <button className="btn btn-warning" onClick={() => handleSubmitQuestionForQuiz()}>Save Questions</button>
            </div>
          }
      </div>
    </div>
  );
};
export default Questions;
