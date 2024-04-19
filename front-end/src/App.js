import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from "./user/pages/Login";
import SignUp from "./user/pages/SignUp";
import Home from "./user/pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login></Login>
        </Route>
        <Route path="/signup" exact>
          <SignUp></SignUp>
        </Route>
        <Route path="/home" exact>
          <Home></Home>
        </Route>
        <Redirect to="/home" />
      </Switch>
    </Router>
  );
}

export default App;
