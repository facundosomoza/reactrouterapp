import React, { useEffect, useState } from "react";
import AddUser from "./Components/AddUser";
import FormRegister from "./Components/FormRegister";
import FormLogin from "./Components/FormLogin";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import UserList from "./Components/UserList";

import { initializeApp } from "firebase/app";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

function App() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBzsM7w8Zt4mqzek7WFgArpGkcW3iZkCtM",
    authDomain: "fir-auth-ffda7.firebaseapp.com",
    projectId: "fir-auth-ffda7",
    storageBucket: "fir-auth-ffda7.appspot.com",
    messagingSenderId: "347416012238",
    appId: "1:347416012238:web:e68193928287d979bf379f",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const [logUser, setLogUser] = useState(false);
  const [infoEmail, setInfoEmail] = useState(null);

  const handleStateForms = () => {
    setLogUser(true);
  };

  const handleDataEmail = (email) => {
    setInfoEmail(email);
  };

  const handleStateLogOut = () => {
    setLogUser(false);
  };
  /*
  useEffect(() => {
    localStorage.setItem("surname", "Ramirez"); //Si existe la key, actualiza el valor sino crea la key con el valor nuevo.(agregr keys o modificar valor key)

    const value = localStorage.getItem("surname");

    console.log(value);
    localStorage.removeItem("name"); // esto elimina la key con su valor

    localStorage.clear(); //elimina todas las keys creadas, siempre teniendo en cuenta que borra las del propio sitio
  }, []);
*/
  useEffect(() => {
    const value = localStorage.getItem("login");

    console.log(value);
    if (value) {
      console.log("logueado");
      setLogUser(true);
      setInfoEmail(value);
    } else {
      console.log("NO logueado");
    }
  });
  return (
    <BrowserRouter>
      <NavBar
        logUser={logUser}
        infoEmail={infoEmail}
        handleStateLogOut={handleStateLogOut}
      ></NavBar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/register">
          <FormRegister app={app} />
        </Route>

        <Route path="/login">
          <FormLogin
            app={app}
            handleStateForms={handleStateForms}
            handleDataEmail={handleDataEmail}
          />
        </Route>

        <Route path="/adduser">
          <AddUser />
        </Route>

        {logUser && (
          <Route path="/userlist">
            <UserList app={app} />
          </Route>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
