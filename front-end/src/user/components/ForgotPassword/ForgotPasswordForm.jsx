import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./ForgotPasswordForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState("");
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleChange = (event) => {
    setEmail(event.target.value);
    // Clear email error when user types
    setEmailError("");
  };

  const handleClick = (event) => {
    event.preventDefault();
    // history.push("/verify/" + email);
  };

  return (
    <form className="forgotpass-form">
      <div>
        <img src="/images/teal-logo.png" alt="Logo" />
      </div>
      <div className="frameFg">
        <h1>Quên mật khẩu</h1>
        <p>
          Điền email gắn với tài khoản của bạn để nhận đường dẫn thay đổi mật
          khẩu
        </p>
        <div className="fieldFg">
          <input
            id="text"
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="Email đăng nhập"
          />
          <a id="accept" href={`/verify/${email}?forgotpassword=true`}>
            Xác nhận
          </a>
          <Link id="linkFo" to="/login">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
