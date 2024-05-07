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
import ForgotPassword from "./user/pages/ForgotPassword";
import RecoverPassword from "./user/pages/RecoverPassword";
import WalletSetting from "./user/pages/WalletSetting";
import WalletCategory from "./user/pages/WalletCategory";

function App() {
  const [isLoggedIn, setLoginState] = useState(false);
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [avatarURL, setAvatarUrl] = useState(null);
  const [wallet, setWallet] = useState(null);

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

  function setUserWallet(id) {
    setWallet(id);
  }


  let routes;
  if (!token) {
    routes = (<Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/forgotpassword" exact>
        <ForgotPassword />
      </Route>
      <Route path="/recoverpassword" exact>
        <RecoverPassword />
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
  } if (true) {
    routes = <Switch>
      <Route path="/user">
        <div className="users-routes" >
          <UserSideBar />
          <Switch>
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
            <Route path="/user/wallet/setting" exact>
              <WalletSetting />
            </Route>
            <Route path="/user/wallet/category" exact>
              <WalletCategory />
            </Route>
            <Route path="/user/wallet/:id" exact>
              <UserWalletDetail />
            </Route>
            <Route path="/user/information" exact>
              <UserInformation />
            </Route>
          </Switch>
        </div>
      </Route>
      <Redirect to="/user/overview" />
    </Switch>
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      userID: userID,
      avatarURL: avatarURL,
      token: token,
      login: login,
      logout: logout,
      updateAvt: updateAvatarURL,
      wallet: wallet,
      setWallet: setUserWallet
    }}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
