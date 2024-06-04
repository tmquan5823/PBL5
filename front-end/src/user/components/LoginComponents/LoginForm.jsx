import React, { useContext, useState } from "react";

import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/util/validators";
import "./LoginForm.css";
import Button from "../../../shared/components/FormElements/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { successNotification, errorNotification, warningNotification } from "../../../shared/components/UIElements/Warning";

const LoginForm = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();

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
            const responseData = await sendRequest(process.env.REACT_APP_URL + '/api/auth/login', 'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    "Content-Type": 'application/json'
                });
            if (!responseData.state) {
                if (responseData.message === "Cần xác thực mail!!!") {
                    history.push("/verify/" + formState.inputs.email.value);
                } else {
                    warningNotification(responseData.message);
                }
            } else {
                auth.login(responseData.access_token, responseData.avatar_url, responseData.role, responseData.user_id);
                successNotification(responseData.message);
            }
        } catch (err) {
            console.log(err);
            errorNotification(err);
        }
    }


    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={onSubmitHandler} className="login-form">
            <Input
                id="email"
                element="input"
                type="text"
                text="Email"
                onInput={inputHandler}
                errorText="Email không hợp lệ!"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                width="90%">
            </Input>
            <Input
                id="password"
                element="input"
                type="password"
                text="Mật khẩu"
                onInput={inputHandler}
                errorText="Vui lòng nhập mật khẩu!"
                validators={[VALIDATOR_REQUIRE()]}
                width="90%">
            </Input>
            <Button type="submit" disabled={!formState.isValid} confirm>Đăng nhập</Button>
        </form>
    </React.Fragment >
};

export default LoginForm;