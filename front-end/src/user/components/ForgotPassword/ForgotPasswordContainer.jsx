import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm"

import "./ForgotPasswordContainer.css";

function ForgotPasswordContainer(props) {
  return (
    <div className="containerFg">
      <div >
        <img src="/images/logo.png" alt="Logo" className="logo" />
      </div>
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordContainer;