import React from "react";
import RecoverPasswordForm from "./RecoverPasswordForm";



function RecoverPasswordContainer(props) {
  return (
    <div className="container">
      <div >
        <img src="/images/logo.png" alt="Logo" className="logo" />
      </div>
      <RecoverPasswordForm />
    </div>
  );
}

export default RecoverPasswordContainer;