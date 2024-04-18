import React from "react";
import "./SignUp.css";
import SignUpContainer from "../components/SignUpComponents/SignUpContainer";
import SignUpNavigation from "../../shared/components/Navigations/SignUpNavigation";

const SignUp = props => {
    return <div className="signup-page">
        <SignUpNavigation />
        <SignUpContainer />
    </div>
};

export default SignUp;