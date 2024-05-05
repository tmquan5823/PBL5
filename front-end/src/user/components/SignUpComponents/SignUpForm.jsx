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

    useEffect(() => {
        if (formState.inputs.password_confirm.value !== formState.inputs.password.value) {
            setPasswordState(false);
        }
        else {
            setPasswordState(true);
        }
    }, [formState.inputs.password_confirm.value, formState.inputs.password.value])

    useEffect(() => {
        setSignupFormState(passwordState && formState.isValid);
    }, [passwordState, formState]);

    async function registerHandler(event) {
        event.preventDefault();

        try {
            const responseData = await sendRequest(process.env.REACT_APP_URL + '/api/auth/register', 'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    firstname: formState.inputs.first_name.value,
                    lastname: formState.inputs.last_name.value,
                    telephone: formState.inputs.phonenumber.value,
                }),
                {
                    'Content-Type': 'application/json'
                });
            if (responseData.state) {
                history.push(`/verify/${formState.inputs.email.value}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={registerHandler} className="signup-form">
            <h3>Đăng ký</h3>
            <div className="name-field">
                <Input
                    id="first_name"
                    element="input"
                    type="text"
                    text="Họ"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    width="45%">
                </Input>
                <Input
                    id="last_name"
                    element="input"
                    type="text"
                    text="Tên"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    width="45%">
                </Input>
            </div>
            <Input
                id="email"
                element="input"
                type="text"
                text="Email"
                onInput={inputHandler}
                errorText="Email không hợp lệ!"
                validators={[VALIDATOR_EMAIL()]}>
            </Input>
            <Input
                id="phonenumber"
                element="input"
                type="text"
                text="Số điện thoại"
                numberOnly
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}>
            </Input>
            <Input
                id="password"
                element="input"
                type="password"
                text="Mật khẩu"
                errorText="Mật khẩu ít nhất 8 kí tự!"
                onInput={inputHandler}
                validators={[VALIDATOR_MINLENGTH(8)]}>
            </Input>
            <Input
                id="password_confirm"
                element="input"
                type="password"
                text="Nhập lại mật khẩu"
                onInput={inputHandler}
                margin="0"
                validators={[VALIDATOR_REQUIRE()]}>
            </Input>
            {!passwordState && <p className="confirm-password--invalid">Mật khẩu xác thực không khớp!</p>}
            <div className="signup-form--footer">
                <div className="signup-button">
                    <Button disabled={!signupFormState} type="submit" confirm>Sign Up</Button>
                </div>
                <p>Đã có tài khoản? <a href="/login">Đăng nhập</a>  </p>
            </div>
        </form>
    </React.Fragment>
};

export default SignUpForm;