import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  // Kiểm soát phân trang
  const [index, setIndex] = useState(0);
  // console.log(location);
  // console.log('Checkl pram',params);
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
      console.log(data);
    }
  };
  const handlePrev = () => {
    if(index - 1 < 0) return;
    setIndex(index - 1)
  }
  const handleNext = () =>{
    if(dataQuiz && dataQuiz.length > index + 1)
    setIndex(index + 1)
  }
  return (
    <div className="detail-quiz-container">
      <section className="left-content">
        <div className="title">
          Quiz-{quizId}: {location?.state?.quizTitle}
        </div>
        <hr></hr>
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <Question
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>Preview</button>
          <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
        </div>
      </section>
      <section className="right-content">count down</section>
    </div>
  );
};
export default DetailQuiz;
