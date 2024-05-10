import React, { useState, useContext, useEffect } from "react";
import "./SignUpForm.css";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Button from "../../../shared/components/FormElements/Button";
import { useHistory } from 'react-router-dom';
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const SignUpForm = props => {
    const [passwordState, setPasswordState] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [signupFormState, setSignupFormState] = useState(false);
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        first_name: {
            value: "",
            isValid: false
        },
        last_name: {
            value: "",
            isValid: false
        },
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        },
        password_confirm: {
            value: "",
            isValid: false
        },
        phonenumber: {
            value: "",
            isValid: false
        },
    }, false);

    async function signupHandler(event) {
        event.preventDefault();
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/auth/register", "POST",
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    lastname: formState.inputs.last_name.value,
                    firstname: formState.inputs.first_name.value,
                }),
                {
                    "Content-Type": 'application/json'
                }
            );
            console.log(resData);

            if (resData.state) {
                history.push('/verify/' + formState.inputs.email.value);
            }
        } catch (err) {

        }
    }

    return <form className="signup-form">
        <h3>Đăng ký</h3>
        <div className="name-field">
            <Input
                id="first_name"
                element="input"
                type="text"
                text="Họ"
                onInput={inputHandler}
                errorText="Invalid email!"
                validators={[VALIDATOR_REQUIRE()]}
                width="48%">
            </Input>
            <Input
                id="last_name"
                element="input"
                type="text"
                text="Tên"
                onInput={inputHandler}
                errorText="Invalid email!"
                validators={[VALIDATOR_REQUIRE()]}
                width="48%">
            </Input>
        </div>
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
            id="phonenumber"
            element="input"
            type="text"
            text="Số điện thoại"
            onInput={inputHandler}
            errorText="Invalid email!"
            validators={[VALIDATOR_REQUIRE()]}>
        </Input>
        <Input
            id="password"
            element="input"
            type="password"
            text="Mật khẩu"
            onInput={inputHandler}
            errorText="Invalid email!"
            validators={[VALIDATOR_REQUIRE()]}>
        </Input>
        <Input
            id="password-confirm"
            element="input"
            type="password"
            text="Nhập lại mật khẩu"
            onInput={inputHandler}
            errorText="Invalid email!"
            validators={[VALIDATOR_REQUIRE()]}>
        </Input>
        <div className="signup-form--footer">
            <div className="signup-button">
                <Button onClick={signupHandler} type="submit" confirm>Sign Up</Button>
            </div>
            <p>Đã có tài khoản? <a href="/login">Đăng nhập</a>  </p>
        </div>
    </form>
};

export default SignUpForm;