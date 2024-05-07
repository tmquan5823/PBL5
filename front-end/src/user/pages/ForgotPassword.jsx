import React from "react";
import "./SignUp.css";

import ForgotPasswordNavigation from "../../shared/components/Navigations/ForgotPasswordNavication";
import ForgotPasswordContainer from "../components/ForgotPassword/ForgotPasswordContainer";

const ForgotPassword = props => {

    return <div class='singup-page'>
            <ForgotPasswordNavigation />
            <ForgotPasswordContainer />
      </div>  

};

export default ForgotPassword;