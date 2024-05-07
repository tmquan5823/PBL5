import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm"

import "./ForgotPasswordContainer.css";

function ForgotPasswordContainer(props) {
  return (
    <div className="container">
      <div >
        <img src="/images/logo.png" alt="Logo" className="logo" />
      </div>
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordContainer;