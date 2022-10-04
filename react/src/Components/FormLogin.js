import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Swal from "sweetalert2";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { useHistory } from "react-router-dom";

export default function FormLogin({ app, handleStateForms, handleDataEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleAccept = () => {
    let valid = true;

    if (email.trim().length === 0) {
      setMessage("You must fill out the field");
      valid = false;
    }
    if (password.trim().length === 0) {
      setMessage("You must fill out the field");
      valid = false;
    }
    if (valid) {
      LoginUser();
    }
  };

  const LoginUser = async () => {
    try {
      const auth = getAuth(app);

      const res = await signInWithEmailAndPassword(auth, email, password);

      await Swal.fire("You have succesfully logged in");
      handleStateForms();
      localStorage.setItem("login", email);
      handleDataEmail(email);
      setEmail("");
      setPassword("");
      history.push("/userlist");
    } catch (error) {
      Swal.fire("User or Password are not valid");
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={9} sm={8} md={7} lg={5} xl={4} className="bg-light mt-5">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" onChange={handleEmail} value={email} />
              {email ? "" : message}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handlePassword}
                value={password}
              />
              {password ? "" : message}
            </Form.Group>
            <Button variant="secondary" onClick={handleAccept}>
              Accept
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
