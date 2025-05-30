import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllQuizForAdmin, getAllUser,postAssignQuiz,  } from "../../../../services/apiServices";
import { toast } from "react-toastify";
const AssignQuiz = () => {
  const [isPrevewImage, setIsPreViewImage] = useState(false);
  const [previewImage, setPreviewImage] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  useEffect(() => {
    fetchQuiz();
    fetchUser();
    return () => {
      if (previewImage.url.length > 0) {
        URL.revokeObjectURL(previewImage.url);
      }
    };
  }, [isPrevewImage]);
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
  const fetchUser = async () => {
    let res = await getAllUser();
    // console.log("res all quiz", res);
    if (res && res.EC === 0) {
      let newUsers = res.DT.map((item) => ({
        value: item.id,
        label: `${item.id}-${item.username}`,
      }));
      setListUser(newUsers);
    }
  };
  const handleAssign = async () =>{
    const res = await postAssignQuiz(+selectedQuiz.value, +selectedUser.value)
    if(res && res.EC === 0){
      toast.success(res.EM);
      
    }else{
      toast.error(res.EM);
    }
    
    
  }
  return (
    <div className="assign-quiz-container row">
      <section className="col-6 form-group">
        <label className="mb-2">Select Quiz: </label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </section>
       <section className="col-6 form-group">
        <label className="mb-2">Select User: </label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </section>
      <div className="btn btn-warning mt-3" onClick={() => handleAssign()}>Assign</div>
    </div>
  );
};
export default AssignQuiz;
