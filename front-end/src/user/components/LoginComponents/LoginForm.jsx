import React, { useCallback, useReducer } from "react";

import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";

import "./LoginForm.css";
import Button from "../../../shared/components/FormElements/Button";
import { useForm } from "../../../shared/hooks/form-hook";

const LoginForm = props => {
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

    return <form className="login-form">
        <Input
            id="email"
            element="input"
            type="text"
            text="Email"
            onInput={inputHandler}
            errorText="Invalid email!"
            validators={[VALIDATOR_REQUIRE()]}>
        </Input>
        <Input
            id="password"
            element="input"
            type="text"
            text="Password"
            onInput={inputHandler}
            errorText="Invalid password!"
            validators={[VALIDATOR_REQUIRE()]}>
        </Input>
        <Button type="submit" disabled={!formState.isValid} confirm>Login</Button>
    </form>
};

export default LoginForm;