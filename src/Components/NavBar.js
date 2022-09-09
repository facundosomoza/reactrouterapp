import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

export default function NavBar({ logUser, infoEmail, handleStateLogOut }) {
  const handleLogOut = () => {
    handleStateLogOut();
  };

  return (
    <>
      <Row>
        <Col>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Router-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {!logUser ? (
                  <>
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>

                    <Link className="nav-link" to="/login">
                      Log-in
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="nav-link" to="/userlist">
                      User List
                    </Link>
                    <Link className="nav-link" to="/" onClick={handleLogOut}>
                      Log-Out
                    </Link>
                    <div className="nav-link disabled">{infoEmail}</div>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </>
  );
}
