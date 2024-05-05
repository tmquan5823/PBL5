import React, { useCallback, useState } from "react";
import { BrowserRouter, Route, Redirect, Switch, useLocation } from "react-router-dom";
import Login from "./user/pages/Login";
import SignUp from "./user/pages/SignUp";
import Home from "./user/pages/Home";
import { AuthContext, updateAvatarURL } from "./shared/context/auth-context";
import UserSideBar from "./shared/components/Navigations/UserSideBar";
import UserOverview from "./user/pages/UserOverview";
import UserBudget from "./user/pages/UserBudget";
import UserTransaction from "./user/pages/UserTransaction";
import UserInformation from "./user/pages/UserInformation";
import UserBudgetDetail from "./user/pages/UserBudgetDetail";
import VerifyPage from "./user/pages/VerifyPage";
import UserWalletDetail from "./user/pages/UserWalletDetail";

function App() {
  const [isLoggedIn, setLoginState] = useState(false);
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [avatarURL, setAvatarUrl] = useState(null);

  const login = useCallback((uid, token, url) => {
    setLoginState(true);
    setUserID(uid);
    setToken(token);
    setAvatarUrl(url);
  }, [])

  const logout = useCallback(() => {
    setLoginState(false);
    setUserID(null);
    setToken(null);
  }, []);

  function updateAvatarURL(url) {
    setAvatarUrl(url);
    setUserID(preval => preval + 1);
  };


  let routes;
  if (!token) {
    routes = (<Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/verify/:email" exact>
        <VerifyPage />
      </Route>
      <Redirect to="/" />
    </Switch>)
  } else {
    routes = <Switch>
      <Route path="/user">
        <div className="users-routes" >
          <UserSideBar />
          <Route path="/user/overview" exact>
            <UserOverview />
          </Route>
          <Route path="/user/budget" exact>
            <UserBudget />
          </Route>
          <Route path="/user/budget/:budgetID">
            <UserBudgetDetail />
          </Route>
          <Route path="/user/transaction" exact>
            <UserTransaction />
          </Route>
          <Route path="/user/wallet-detail" exact>
            <UserWalletDetail />
          </Route>
          <Route path="/user/information" exact>
            <UserInformation />
          </Route>
        </div>
      </Route>
      <Redirect to="/user/overview" />
    </Switch>
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, userID: userID, avatarURL: avatarURL, token: token, login: login, logout: logout, updateAvt: updateAvatarURL }}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
