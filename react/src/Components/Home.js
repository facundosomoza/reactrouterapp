import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Home() {
  return (
    <Container fluid>
      <Row
        style={{ height: "80vh" }}
        className="justify-content-center align-items-center"
      >
        <Col xs={6} className="text-center">
          <h1>React Router App</h1>
        </Col>
      </Row>
    </Container>
  );
}
