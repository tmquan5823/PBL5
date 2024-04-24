import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch, useLocation } from "react-router-dom";
import Login from "./user/pages/Login";
import SignUp from "./user/pages/SignUp";
import Home from "./user/pages/Home";
import UserSideBar from "./shared/components/Navigations/UserSideBar";
import UserOverview from "./user/pages/UserOverview";
import UserBudget from "./user/pages/UserBudget";
import UserTransaction from "./user/pages/UserTransaction";
import UserChart from "./user/pages/UserChart";
import UserInformation from "./user/pages/UserInformation";

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
        </Switch>
        <Switch>
          <Route path="/users">
            <div className="users-routes">
              <UserSideBar />
              <Switch>
                <Route path="/users/overview" exact>
                  <UserOverview />
                </Route>
                <Route path="/users/budget" exact>
                  <UserBudget />
                </Route>
                <Route path="/users/transaction" exact>
                  <UserTransaction />
                </Route>
                <Route path="/users/chart" exact>
                  <UserChart />
                </Route>
                <Route path="/users/information" exact>
                  <UserInformation />
                </Route>
              </Switch>
            </div>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
