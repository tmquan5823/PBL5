import React from "react";

import Button from "../../../shared/components/FormElements/Button";

import "./OuterLogin.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const OuterLogin = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    async function googleLoginHandler() {
        console.log("abc");
        try {
            const responseData = await sendRequest(process.env.REACT_APP_URL + "/api/google/login", 'GET');
            console.log(responseData);
        } catch (err) {
            console.log(err);
        }
    }

    return <React.Fragment>
        <div className="outer-login-container">
            <Button onClick={googleLoginHandler} image="https://cdn-icons-png.flaticon.com/256/300/300221.png" whilte>Continue with Google</Button>
            <Button onClick={googleLoginHandler} image="https://cdn-icons-png.flaticon.com/256/5968/5968764.png" whilte>Continue with Facebook</Button>
            <Button onClick={googleLoginHandler} image="https://cdn-icons-png.flaticon.com/256/542/542689.png" whilte>Continue with Email</Button>
        </div>
    </React.Fragment>
};

export default OuterLogin;