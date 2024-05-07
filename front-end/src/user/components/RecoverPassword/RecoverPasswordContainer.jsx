import React from "react";
import RecoverPasswordForm from "./RecoverPasswordForm";
import "./RecoverPasswordContainer.css"



function RecoverPasswordContainer(props) {
  return (
    <div className="containerRe">
      <div >
        <img src="/images/logo.png" alt="Logo" className="logo" />
      </div>
      <RecoverPasswordForm />
    </div>
  );
}

export default RecoverPasswordContainer;