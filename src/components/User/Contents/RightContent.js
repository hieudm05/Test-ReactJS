import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz } = props;
  const onTimeUp = () => {
    props.handleFinishQuiz();
    alert("Time is up!");
  };
  return (
    <>
      <div className="man-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => (
            <div className="question">{index + 1}</div>
          ))}
      </div>
    </>
  );
};
export default RightContent;
