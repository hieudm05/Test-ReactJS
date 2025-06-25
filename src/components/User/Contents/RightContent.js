import CountDown from "./CountDown";
import { useRef } from "react";

const RightContent = (props) => {
    const refDiv = useRef([]);
  const { dataQuiz } = props;
  const onTimeUp = () => {
    props.handleFinishQuiz();
  };
  const getClassQuestion = (index, question) => {
    // console.log("check question", question);
    // Check answered
    if (question && question.answers && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return "question selected";
      }
    }
    return "question";
  };
  const handleClickQuestion = (question, index) =>{
    props.setIndex(index);
    if(refDiv.current){
        // Reset all questions to default class
        refDiv.current.forEach((item, idx) => {
            if (item && item.className === "question clicked") {
                item.className = "question";
            }
        });
    }
     if (question && question.answers && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  }
  return (
    <>
      <div className="man-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => (
            <div
              className={getClassQuestion(index, item)}
              onClick={() => handleClickQuestion(item, index)}
                ref={ref => refDiv.current[index] = ref}
            >
              {index + 1}
            </div>
          ))}
      </div>
    </>
  );
};
export default RightContent;
