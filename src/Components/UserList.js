import { getFirestore, getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function UserList({ app }) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const db = getFirestore(app);

    const usersCollection = collection(db, "users");

    const querySnapshot = await getDocs(usersCollection);

    const newUsers = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();

      newUsers.push(userData);
    });

    setUsers(newUsers);
  };

  //Warning: useEffect must not return anything besides a function.
  //como es una funcion async retorna una promise
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Row>
      {users.map((user) => (
        <Col>
          <Card className="card-link">
            <Card.Body>
              <Card.Title>{user.userName}</Card.Title>
              <Card.Text>{user.userEmail}</Card.Text>
              <Card.Text>{user.userPhone}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
