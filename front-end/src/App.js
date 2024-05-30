import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";
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
import Cookies from "js-cookie";
import AdminSideBar from "./shared/components/Navigations/AdminSideBar";
import AdminOverview from "./admin/pages/AdminOverview";
import AdminMessage from "./admin/pages/AdminMessage";
import AdminProfile from "./admin/pages/AdminProfile";
import ProfileUser from "./admin/components/OverviewComponents/ProfileUser";
import store from "./shared/store/index";
import { Provider } from "react-redux";
import ChatBubble from "./shared/components/ChatBubble/ChatBubble";


function App() {
  const [isLoggedIn, setLoginState] = useState(false);
  const [token, setToken] = useState(null);
  const [avatarURL, setAvatarUrl] = useState(null);
  const [wallet, setWallet] = useState();
  const [role, setRole] = useState();
  const [userId, setUserId] = useState();
  const history = useHistory();

  const login = useCallback((token, url, role, userId) => {
    setLoginState(true);
    setToken(token);
    setAvatarUrl(url);
    setRole(role);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setLoginState(false);
    setToken(null);
    setAvatarUrl(null);
    setRole(null);
  }, []);

  function updateAvatarURL(url) {
    setAvatarUrl(url);
  }

  function setUserWallet(id) {
    setWallet(id);
  }

  const adminRoutes = (
    <Switch>
      <Route path="/admin">
        <div className="admin-routes">
          <AdminSideBar />
          <Switch>
            <Route path="/admin/overview" exact>
              <AdminOverview />
            </Route>
            <Route path="/admin/overview/:id" exact>
              <ProfileUser />
            </Route>
            <Route path="/admin/message" exact>
              <AdminMessage />
            </Route>
            <Route path="/admin/profile" exact>
              <AdminProfile />
            </Route>
          </Switch>
        </div>
      </Route>
      <Redirect to="/admin/overview" />
    </Switch>
  );

  const userRoutes = (
    <Switch>
      <Route path="/user">
        <div className="users-routes">
          <UserSideBar />
          <ChatBubble />
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
  );

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
  } else {
    routes = role == 'USER' ? userRoutes : adminRoutes;
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          userID: userId,
          isLoggedIn: !!token,
          avatarURL: avatarURL,
          token: token,
          login: login,
          logout: logout,
          role: role,
          updateAvt: updateAvatarURL,
          wallet: wallet,
          setWallet: setUserWallet
        }}>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
