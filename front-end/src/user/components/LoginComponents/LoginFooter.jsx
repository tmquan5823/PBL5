import React from "react";
import "./LoginFooter.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LoginFooter = props => {
    return <div className="login-footer">
        <Link className="forgot-password" to="/ForgotPassword">Quên mật khẩu</Link>
        <p>Secure Login with reCAPTCHA subject to
            Google <a href="">Terms</a> & <a href="">Privacy</a></p>
    </div>
};

export default LoginFooter;