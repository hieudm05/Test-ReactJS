
const RightContent = (props) => {
    const {dataQuiz} = props;
    return (
        <>
            <div className="man-timer">
                10: 10
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 && dataQuiz.map((item, index) => (

                    <div className="question">{index + 1}</div>
                )
                )}
            </div>
        </>
    )
}
export default RightContent