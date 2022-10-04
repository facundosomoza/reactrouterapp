import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function EditUser({
  modal,
  handleModalOff,
  selectedUser,
  getUsers,
  app,
}) {
  const [userName, setUserName] = useState(selectedUser.userName);
  const [phoneNumber, setPhoneNumber] = useState(selectedUser.userPhone);

  const [message, setMessage] = useState("");

  useEffect(() => {
    setUserName(selectedUser.userName);
    setPhoneNumber(selectedUser.userPhone);
  }, [selectedUser]);

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSaveChanges = async () => {
    const db = getFirestore(app);

    let valid = true;

    if (userName.trim().length === 0) {
      setMessage("You must fill out the fields");
      valid = false;
    }
    if (phoneNumber.trim().length === 0) {
      setMessage("You must fill out the fields");
      valid = false;
    }
    if (valid) {
      const newUser = {
        userName,
        phoneNumber,
      };

      try {
        const userId = selectedUser.id;

        const userDoc = doc(db, "users", userId);

        await updateDoc(userDoc, newUser);

        Swal.fire({
          title: "User was updated",
          icon: "success",
        });
        getUsers();
        handleModalOff();
      } catch (error) {
        Swal.fire({
          title: "User could not updated updated",
          icon: "error",
        });
      }
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: `Are you sure you want to delete the user ${userName} ${phoneNumber}?`,

      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const db = getFirestore(app);

        const userToDelete = doc(db, "users", selectedUser.id);

        await deleteDoc(userToDelete);

        handleModalOff();
        getUsers();

        Swal.fire("User has been deleted!");
      }
    });
  };

  return (
    <>
      <Modal show={modal} onHide={handleModalOff}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Fullname</Form.Label>
            <Form.Control onChange={handleUsername} value={userName} />
            {userName ? "" : message}
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control onChange={handlePhoneNumber} value={phoneNumber} />
            {phoneNumber ? "" : message}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
//onHide={handleClose}
