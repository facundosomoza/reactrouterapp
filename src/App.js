import "./App.css";
import AddUser from "./Components/AddUser";
import FormRegister from "./Components/FormRegister";
import FormLogin from "./Components/FormLogin";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import UserList from "./Components/UserList";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/register">
          <FormRegister />
        </Route>

        <Route path="/login">
          <FormLogin />
        </Route>

        <Route path="/adduser">
          <AddUser />
        </Route>

        <Route>
          <UserList path="/userlist" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
