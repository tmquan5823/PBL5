import React from "react";
import { Link } from "react-router-dom"
import Button from "../FormElements/Button";
import "./LoginNavigation.css";


import "./LoginNavigation.css";

const SignUpNavigation = props => {
    return <header className="login-nav">
        <Link to="/">← Back</Link>
        <Link to="/login" >
            <Button confirm>
                LOGIN
            </Button>
        </Link>
    </header>
};

export default SignUpNavigation;