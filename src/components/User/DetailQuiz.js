import { useEffect, useState } from "react";
import { useParams, useLocation, data } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Contents/RightContent";
const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [isTimeUp, setIsTimeUp] = useState(false);
  // Kiểm soát phân trang
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const quizId = params.id;
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizId);

    if (res && res.EC === 0) {
      let raw = res.DT;
      //   console.log(raw);
      let data = _.chain(raw)
        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            // Lấy dữ liệu về miêu tả và hình ảnh của phần tử đầu tiên (vì những câu hỏi kia đều có 2 trường này giống nhau)
            // console.log(item.questionDescription);
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
            // console.log("item", item);
          });
          return {
            questionId: key,
            answers: answers,
            questionDescription,
            image,
          };
        })
        .value();
      setDataQuiz(data);
      // console.log('data ',data);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) return;

    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };
  // console.log('check data quizz', dataQuiz);
  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === questionId
    );
    if (question && question.answers) {
      let b = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      // console.log(question);
      // Gán đè lại dữ liệu mới về question
      question.answers = b;
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      // Cập nhật vị trí thay đổi
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };
  const handleFinishQuiz = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answersArr = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        // console.log("check item", item);
        let questionId = question.questionId;
        let userAnswerId = [];
        //todo : userAnswerId
        question.answers.forEach((aws) => {
          if (aws.isSelected) {
            userAnswerId.push(aws.id);
          }
        });
        answersArr.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answersArr;
      // Submit api
      let res = await postSubmitQuiz(payload);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("lỗi");
      }
    }
  };
  return (
    <div className="detail-quiz-container">
      <section className="left-content">
        <div className="title">
          Quiz-{quizId}: {location?.state?.quizTitle}
        </div>
        <hr></hr>
        <div className="q-body">{/* <img src="" alt="Quiz" /> */}</div>
        <div className="q-content">
          <Question
            index={index}
            handleCheckBox={handleCheckBox}
            isTimeUp={isTimeUp}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Preview
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
            disabled={dataQuiz.length === 0 || isTimeUp}
          >
            Finish
          </button>
        </div>
      </section>
      <section className="right-content">
        <RightContent dataQuiz={dataQuiz} handleFinishQuiz={handleFinishQuiz} setIndex={setIndex} />
      </section>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
        setIsTimeUp={setIsTimeUp}
      />
    </div>
  );
};
export default DetailQuiz;
