import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import _ from "lodash";

const ShowUserDetail = (props) => {
    const {show, setShow, dataUpdate} = props
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        props.resetUpdateUser();
    }
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [username, setUsername] = useState("");
      const [role, setRole] = useState("USER");
      const [image, setImage] = useState("");
      const [previewImage, setPreviewImage] = useState("");

        useEffect(() => {
          if(!_.isEmpty(dataUpdate)){
              setEmail(dataUpdate.email);
              setUsername(dataUpdate.username);
              setRole(dataUpdate.role);
              setImage("");
              if(dataUpdate.image){
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
              }
          }
        },[dataUpdate]);
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            {/* Image Section */}
            <div className="col-md-4 text-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="User Avatar"
                  className="img-fluid rounded border"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="border d-flex align-items-center justify-content-center"
                  style={{ height: "300px", background: "#f0f0f0" }}
                >
                  No Image
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="col-md-8">
              <div className="mb-3">
                <strong>Email:</strong> {email}
              </div>
              <div className="mb-3">
                <strong>Username:</strong> {username}
              </div>
              <div className="mb-3">
                <strong>Role:</strong> {role}
              </div>
              {/* Add more fields if necessary */}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowUserDetail;
