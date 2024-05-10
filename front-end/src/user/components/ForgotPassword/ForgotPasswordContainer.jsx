import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm"

import "./ForgotPasswordContainer.css";

function ForgotPasswordContainer(props) {
  return (
    <div className="containerFg">
      <div >
        <img id="imgFo" src="/images/logo.png" alt="Logo" />
      </div>
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordContainer;