import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./ForgotPasswordForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, validate } from "../../../shared/util/validators";
import { useForm } from "antd/es/form/Form";

const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState();
  const [emailIsValid, setEmailIsvalid] = useState(false);

  const [formState, inputHandler] = useForm({
    email: {
      value: "",
      isValid: false
    },
  }, false);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value) {
      setEmailIsvalid(validate(value, [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]));
    }
    setEmail(value);
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
            id="email"
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="Email đăng nhập"
          />
          <a
            className={`${!emailIsValid && 'email-invalid'} accept`}
            disabled={!emailIsValid}
            href={`${emailIsValid ? '/verify/' + email + '?forgotpassword=true' : "#"}`}>
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
