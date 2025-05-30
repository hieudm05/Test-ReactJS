import { useState, useEffect } from "react";
import Select from "react-select";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import "react-awesome-lightbox/build/style.css";
import { toast } from "react-toastify";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  getQuizWithQA,
} from "../../../../services/apiServices";
import _ from "lodash";
import "./QuizQA.scss";
import Lightbox from "react-awesome-lightbox";

const QuizQA = (props) => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      isValidQuestion: false,
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isValidAnswer: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const [isPrevewImage, setIsPreViewImage] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [previewImage, setPreviewImage] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchQuiz();
    return () => {
      if (previewImage.url.length > 0) {
        URL.revokeObjectURL(previewImage.url);
      }
    };
  }, [isPrevewImage]);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);
      // return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
      if (url.startsWith("data:")) {
        var arr = url.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[arr.length - 1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], filename, { type: mime || mimeType });
        return Promise.resolve(file);
      }
      return fetch(url)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], filename, { type: mimeType }));
    }
  const fetchQuizWithQA = async () => {
    const res = await getQuizWithQA(selectedQuiz.value);
    // console.log("check res", res);
      if (res && res.EC === 0) {
      // Convert base64 to File object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if(res.DT.qa[i].imageFile){
          q.imageName = `Question-${q.id}`
          q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}`,'image/png')
        }
        newQA.push(q);
      }
      setQuestions(res.DT.qa);
    }
  };
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    // console.log("res all quiz", res);
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => ({
        value: item.id,
        label: `${item.id}-${item.name}`,
      }));
      setListQuiz(newQuiz);
    }
  };
  const handleAddRemoveQuestion = (type, id) => {
    // console.log("check id", type, id);
    if (type === "ADD") {
      const newQuestion = {
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
    let index = questionClone.findIndex((item) => item.id === questionId);
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
      setQuestions(questionClone);
    }
  };
  const handleSubmitQuestionForQuiz = async () => {
    // Todo
    // Validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a quiz");
      return;
    }
    // Validate answers and questions
    let errors = [];
    let questionClone = _.cloneDeep(questions);
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          errors.push((questionClone[i].answers[j].isValidAnswer = true));
        } else {
          questionClone[i].answers[j].isValidAnswer = false;
        }
      }
    }
    for (let i = 0; i < questionClone.length; i++) {
      if (!questionClone[i].description) {
        errors.push((questionClone[i].isValidQuestion = true));
      } else {
        questionClone[i].isValidQuestion = false;
      }
    }
    if (errors.length > 0) {
      setQuestions(questionClone);
      return;
    }
    setQuestions(questionClone);

    // Validate isCorrect
    let isValidCorrect = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (questions[i].answers[j].isCorrect) {
          isValidCorrect++;
          break;
        }
      }
      if (isValidCorrect > 0) break;
    }
    if (isValidCorrect === 0) {
      toast.error("Must select at least 1 correct answer");
      return;
    }
    // console.log(isValidAnswer, "Q= ",indexQ, "A= ",indexA);
    for (const question of questions) {
      let q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      // Submit quiz
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success("Create Question adn Answer Successed!");
    // Tạo xong thì xoá form
    setQuestions(initQuestions);
    setSelectedQuiz(null);
  };
  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setPreviewImage({
        title: questionClone[index].imageName,
        url: URL.createObjectURL(questionClone[index].imageFile),
      });
      setIsPreViewImage(true);
    }
  };

  return (
    <div className="question-container">
      <div className="add-new-question">
        <section className="col-6 form-group">
          <label className="mb-2">Select Quiz: </label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </section>
        <div className="mt-3 mb-2">Add question:</div>
        {questions &&
          questions.length > 0 &&
          questions?.map((question, index) => (
            <section key={question.id} className="q-main mb-4">
              <div className="questions-content">
                <div key={question.id} className="form-floating descripsion">
                  <input
                    type="text"
                    className={
                      question.isValidQuestion
                        ? "form-control is-invalid"
                        : "form-control"
                    }
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
                  <span className="">
                    {question.imageName && question.imageName.length > 0 ? (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePreviewImage(question.id)}
                      >
                        {question.imageName}{" "}
                      </span>
                    ) : (
                      "0 file is uploaded"
                    )}
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
                        className={
                          answer.isValidAnswer === true
                            ? "form-control is-invalid"
                            : "form-control"
                        }
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
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSubmitQuestionForQuiz()}
            >
              Save Questions
            </button>
          </div>
        )}
      </div>
      {isPrevewImage === true && (
        <Lightbox
          image={previewImage.url}
          title={previewImage.title}
          onClose={() => {
            setIsPreViewImage(false);
          }}
        ></Lightbox>
      )}
    </div>
  );
};
export default QuizQA;
