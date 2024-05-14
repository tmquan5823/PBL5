import React from "react";
import RecoverPasswordForm from "./RecoverPasswordForm";
import "./RecoverPasswordContainer.css"
import AcpPassNew from "./AcpPassNew";



function RecoverPasswordContainer(props) {
  return (
    <div className="containerRe">
      {/* <div >
        <img src="/images/logo.png" alt="Logo" className="logo" />
      </div> */}
      <AcpPassNew/>
    </div>
  );
}

export default RecoverPasswordContainer;