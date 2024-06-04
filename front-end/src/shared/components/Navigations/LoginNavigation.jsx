import React from "react";
import { Link } from "react-router-dom"


import "./LoginNavigation.css";

const LoginNavigation = props => {
    return <header className="login-nav">
        <Link to="/">← Quay lại</Link>
        <Link to="/signup">Đăng ký</Link>
    </header>
};

export default LoginNavigation;