import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
const Question = (props) => {
  const { data, index, isTimeUp } = props;
  const [isPreViewImage, setIsPreViewImage] = useState(false);
  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleCheckBox = (event, aId, qId) => {
    props.handleCheckBox(aId, qId);
  };
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreViewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
            alt={`Question ${index + 1}`}
          />
          {isPreViewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={`Question`}
              onClose={() => setIsPreViewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers?.map((a, index) => (
            <div key={`answer-${index}`} className="a-child">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  disabled={isTimeUp}
                  // selected = {props.isSelected}
                  checked={a.isSelected}
                  onChange={(event) =>
                    handleCheckBox(event, a.id, +data.questionId)
                  }
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {a.description}
                </label>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Question;
