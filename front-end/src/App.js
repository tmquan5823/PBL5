import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from "./user/pages/Login";
import SignUp from "./user/pages/SignUp";

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
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
