import React from "react";

import LoginForm from "./LoginForm";
import OuterLogin from "./OuterLogin";

import "./LoginContent.css";

const LoginCotent = props => {
    return <div className="login-content">
        <LoginForm />
        <div className="vertical-line">
            <div className="line"></div>
            <div className="line-text">
                OR
            </div>
            <div className="line"></div>
        </div>
        <OuterLogin />
    </div>
};

export default LoginCotent;