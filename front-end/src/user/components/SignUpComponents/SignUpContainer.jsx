import React from "react";
import SignUpForm from "./SignUpForm";
import SignUpPageText from "./SignUpPageText";
import "./SignUpContainer.css"

const SignUpContainer = props => {
    return <div className="signup-container">
        <SignUpPageText />
        <SignUpForm />
    </div>
};

export default SignUpContainer;