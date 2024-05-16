import React, { useContext, useState } from "react";

import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/util/validators";

import "./LoginForm.css";
import Button from "../../../shared/components/FormElements/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import StateModalCard from "../../../shared/components/UIElements/StateModalCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LoginForm = props => {
    const auth = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [loginFail, setLoginFail] = useState(false);
    const [loginMessage, setLoginMessage] = useState();
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
                setLoginFail(true);
                setLoginMessage(responseData.message);
                history.push("/verify/" + formState.inputs.email.value);
            } else {
                auth.login(responseData.access_token, responseData.avatar_url, responseData.role);
            }
        } catch (err) {
            console.log(err);
            setLoginMessage(err.message);
            setShowModal(true);
        }
    }

    function closeModalHandler() {
        setShowModal(false);
        setLoginFail(false);
        clearError();
    }

    return <React.Fragment>
        <StateModalCard
            show={showModal || loginFail}
            onCancel={closeModalHandler}
            state={error ? 'error' : (loginFail ? 'fail' : 'success')}
            message={loginMessage}
        />
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={onSubmitHandler} className="login-form">
            <Input
                id="email"
                element="input"
                type="text"
                text="Email"
                onInput={inputHandler}
                errorText="Invalid email!"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                width="90%">
            </Input>
            <Input
                id="password"
                element="input"
                type="password"
                text="Password"
                onInput={inputHandler}
                errorText="Invalid password!"
                validators={[VALIDATOR_REQUIRE()]}
                width="90%">
            </Input>
            <Button type="submit" disabled={!formState.isValid} confirm>Login</Button>
        </form>
    </React.Fragment >
};

export default LoginForm;