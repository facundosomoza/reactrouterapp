import React, { useState } from "react";
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

        <Route>
          <UserList path="/userlist" app={app} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
