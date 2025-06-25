import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuizApi } from "../../../../services/apiServices";
import { toast } from "react-toastify";
const ModalDelete = (props) => {
  const { show, setShow, dataDelete } = props;
  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    const data = await deleteQuizApi(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      props.fetchQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this{" "}
          <b>
            {" "}
            Quiz {dataDelete.id && dataDelete.id ? dataDelete.id : ""} :{" "}
            {dataDelete.name && dataDelete.name ? dataDelete.name : ""}
          </b>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDelete;
