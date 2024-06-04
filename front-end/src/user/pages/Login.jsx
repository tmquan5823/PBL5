import React from "react";

import LoginForm from "../components/LoginComponents/LoginForm";
import LoginNavigation from "../../shared/components/Navigations/LoginNavigation";
import LoginCotent from "../components/LoginComponents/LoginContent";

import "./Login.css";
import LoginFooter from "../components/LoginComponents/LoginFooter";

const Login = props => {
    return <React.Fragment>
        <LoginNavigation />
        <div className="login-container">
            <div className="login-logo">
                <div className="logo-container">
                    <img className="logo-image" src="/images/logo.png" alt="" />
                </div>
                <h2>ĐĂNG NHẬP</h2>
            </div>
            <LoginCotent />
            <LoginFooter />
        </div>
    </React.Fragment>
};

export default Login;