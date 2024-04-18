import React from "react";

import Button from "../../../shared/components/FormElements/Button";

import "./OuterLogin.css";

const OuterLogin = props => {
    return <React.Fragment>
        <div className="outer-login-container">
            <Button image="https://cdn-icons-png.flaticon.com/256/300/300221.png" whilte>Continue with Google</Button>
            <Button image="https://cdn-icons-png.flaticon.com/256/5968/5968764.png" whilte>Continue with Google</Button>
            <Button image="https://cdn-icons-png.flaticon.com/256/542/542689.png" whilte>Continue with Google</Button>
        </div>
    </React.Fragment>
};

export default OuterLogin;