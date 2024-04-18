import React from "react";
import "./SignUpPageText.css";

const SignUpPageText = props => {
    return <div className="signup-text-container">
        <img className="signup-text-container__logo" src="/images/logo.png" alt="" />
        {/* <h1 className="signup-text__title">エコノミック</h1> */}
        <p className="signup-text__info">Tạo tài khoản để sử dụng dịch vụ của chúng tôi</p>
        <img className="signup-text-container__texture" src="/images/texture.png" alt="" />
    </div>
};

export default SignUpPageText;