import React, { useContext } from "react";

import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";

import "./LoginForm.css";
import Button from "../../../shared/components/FormElements/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";


const LoginForm = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false);

    async function onSubmitHandler(event) {
        event.preventDefault();

        try {
            const responseData = await sendRequest('http://localhost:8080/api/auth/login', 'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    "Content-Type": 'application/json'
                });
            console.log("User id" + responseData.user_id);
            console.log("TOKEN" + responseData.access_token);
            auth.login(responseData.user_id, responseData.access_token, responseData.avatar_url);
        } catch (err) {
            console.log(err);
        }
    }

    return <form onSubmit={onSubmitHandler} className="login-form">
        <Input
            id="email"
            element="input"
            type="text"
            text="Email"
            onInput={inputHandler}
            errorText="Invalid email!"
            validators={[VALIDATOR_REQUIRE()]}
            width="90%">
        </Input>
        <Input
            id="password"
            element="input"
            type="text"
            text="Password"
            onInput={inputHandler}
            errorText="Invalid password!"
            validators={[VALIDATOR_REQUIRE()]}
            width="90%">
        </Input>
        <Button type="submit" disabled={!formState.isValid} confirm>Login</Button>
    </form>
};

export default LoginForm;