import { getFirestore, getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import EditUserList from "./EditUserList";

export default function UserList({ app, handleModalOn }) {
  const [users, setUsers] = useState([]);

  const [modal, setModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(false);

  const getUsers = async () => {
    const db = getFirestore(app);

    const usersCollection = collection(db, "users");

    const querySnapshot = await getDocs(usersCollection);

    const newUsers = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      const userData = { ...doc.data(), id: doc.id };

      newUsers.push(userData);
    });

    setUsers(newUsers);
  };

  //Warning: useEffect must not return anything besides a function.
  //como es una funcion async retorna una promise
  useEffect(() => {
    getUsers();
  }, []);

  const handleModal = (user) => {
    setSelectedUser(user);
    setModal(true);
  };

  const handleModalOff = () => {
    setModal(false);
  };

  return (
    <Container fluid>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {users.map((user) => (
          <Col className="mt-3">
            <Card
              onClick={() => {
                handleModal(user);
              }}
              className="card-link"
            >
              <Card.Body>
                <Card.Title>{user.userName}</Card.Title>
                <Card.Text>{user.userEmail}</Card.Text>
                <Card.Text>{user.userPhone}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <EditUserList
        modal={modal}
        handleModalOff={handleModalOff}
        selectedUser={selectedUser}
        getUsers={getUsers}
        app={app}
      ></EditUserList>
    </Container>
  );
}
