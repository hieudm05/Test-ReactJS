import Select from "react-select";
import "./ManageQuiz.scss";
import { useState } from "react";

const options = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];
const MagageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDecription] = useState("");
  const [type, setType] = useState("Easy");
  const [image, setImage] = useState(null);
  const handleChangeFile = (event) =>{

  }
  return (
    <div className="quiz-contaier container">
      <section className="title"> Magage Quiz</section>
      <hr />
      <section className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new Quiz:</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="your quiz name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label for="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              placeholder="decription..."
              value={description}
              onChange={(event) => setDecription(event.target.value)}
            />
            <label for="floatingPassword">Decription</label>
            <div className="my-3">
              <Select
                value={type}
                // onChange={this.handleChange}
                options={options}
              />
            </div>
            <div className="more-actions form-group">
              <label className="mb-1">Upload image </label> <br />
              {/* <input className="form control" type="file" onChange={handleChangeFile(event)} /> */}
            </div>
          </div>
          <div>
            <button className="btn btn-warning">Save</button>
          </div>
        </fieldset>
      </section>
      <div className="list-detail">Table</div>
    </div>
  );
};
export default MagageQuiz;
