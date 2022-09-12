import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Swal from "sweetalert2";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { getFirestore, setDoc, doc } from "firebase/firestore";

import { useHistory } from "react-router-dom";

export default function FormRegister({ app }) {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleUserPhone = (event) => {
    setUserPhone(event.target.value);
  };

  const handleUserEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const handleUserPassword = (event) => {
    setUserPassword(event.target.value);
  };

  const handleAccept = () => {
    let valid = true;

    if (userName.trim().length === 0) {
      setMessage("You must fill out the field");
      valid = false;
    }
    if (userPhone.trim().length === 0) {
      setMessage("You must fill out the field");
      valid = false;
    }
    if (userEmail.trim().length === 0) {
      setMessage("You must fill out the field");
      valid = false;
    }
    if (userPassword.trim().length === 0) {
      setMessage("You must fill out the field");
      valid = false;
    }
    if (valid) {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      const auth = getAuth(app);

      const res = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const uid = res.user.uid;

      console.log(uid);

      const newUser = {
        uid,
        userName,
        userPhone,
        userEmail,
      };

      const db = getFirestore(app);

      const userDoc = doc(db, "users", uid);

      await setDoc(userDoc, newUser);

      await Swal.fire("User was succesfully registered");
      setUserName("");
      setUserPhone("");
      setUserEmail("");
      setUserPassword("");
      history.push("/login");
    } catch (error) {
      console.log(error.message);
      Swal.fire("Some fields was not fiiled out. Fill them out");
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={9} sm={8} md={7} lg={5} xl={4} className="bg-light mt-5">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="text"
                onChange={handleUserName}
                value={userName}
              />
              {userName ? "" : message}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                onChange={handleUserPhone}
                value={userPhone}
              />
              {userPhone ? "" : message}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                onChange={handleUserEmail}
                value={userEmail}
              />
              {userEmail ? "" : message}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handleUserPassword}
                value={userPassword}
              />
              {userPassword ? "" : message}
            </Form.Group>

            <Button variant="primary" onClick={handleAccept}>
              Accept
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
