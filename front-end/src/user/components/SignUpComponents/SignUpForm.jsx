import React from "react";
import "./SignUpForm.css";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import Button from "../../../shared/components/FormElements/Button";


const SignUpForm = props => {
    const [formState, inputHandler] = useForm({
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
        phonenumber: {
            value: "",
            isValid: false
        },
    }, false);

    return <form action="" className="signup-form">
        <h3>Đăng ký</h3>
        <div className="name-field">
            <Input
                id="first_name"
                element="input"
                type="text"
                text="Họ"
                onInput={inputHandler}
                errorText="Hãy nhập vào mục này"
                validators={[VALIDATOR_REQUIRE()]}>
            </Input>
            <Input
                id="last_name"
                element="input"
                type="text"
                text="Tên"
                onInput={inputHandler}
                errorText="Hãy nhập vào mục này"
                validators={[VALIDATOR_REQUIRE()]}>
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
            errorText="Invalid sđt!"
            validators={[VALIDATOR_REQUIRE()]}>
        </Input>
        <Input
            id="password"
            element="input"
            type="text"
            text="Mật khẩu"
            onInput={inputHandler}
            errorText="Invalid password!"
            validators={[VALIDATOR_REQUIRE()]}>
        </Input>
        <Input
            id="password-confirm"
            element="input"
            type="text"
            text="Nhập lại mật khẩu"
            onInput={inputHandler}
            errorText="Invalid enter the password!"
            validators={[VALIDATOR_REQUIRE()]}>
        </Input>
        <div className="signup-form--footer">
            <div className="signup-button">
                <Button confirm>Sign Up</Button>
            </div>
            <p>Đã có tài khoản? <a href="/login">Đăng nhập</a>  </p>
        </div>
    </form>
};

export default SignUpForm;