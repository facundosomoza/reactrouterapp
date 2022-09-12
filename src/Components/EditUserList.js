import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EditUser({ modal, handleModalOff, selectedUser }) {
  const [userName, setUserName] = useState(selectedUser.userName);
  const [phoneNumber, setPhoneNumber] = useState(selectedUser.userPhone);

  useEffect(() => {
    setUserName(selectedUser.userName);
    setPhoneNumber(selectedUser.userPhone);
  }, [selectedUser]);

  const handleClose = () => {
    handleModalOff();
  };

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSaveChanges = () => {
    console.log(userName, phoneNumber);
  };

  return (
    <>
      <Modal show={modal} onHide={handleModalOff}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>UserName</Form.Label>
            <Form.Control onChange={handleUsername} value={userName} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control onChange={handlePhoneNumber} value={phoneNumber} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
//onHide={handleClose}
