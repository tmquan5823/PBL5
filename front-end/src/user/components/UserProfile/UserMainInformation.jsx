import React from "react";
import "./UserMainInformation.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";


const UserMainInformation = props => {
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

    return <form className="main-infor">
        <div className="main-infor__row">
            <Input id="first-name"
                text="Họ"
                element="input"
                type="text"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                width="48%" />
            <Input id="last-name"
                text="Tên"
                element="input"
                type="text"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                width="48%" />
        </div>
        <Input id="show-name"
            text="Tên hiển thị"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            width="90%" />
        <div className="main-infor__row">
            <Input id="email"
                text="Email"
                element="input"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                width="48%" />
            <Input id="phonenumber"
                text="Số điện thoại"
                element="input"
                type="text"
                onInput={inputHandler}
                width="48%" />
        </div>
        <Input id="address"
            text="Địa chỉ"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            type="text"
            onInput={inputHandler}
            width="90%" />
        <div className="buttons-container">
            <button className="save-btn">
                Lưu
            </button>
            <button className="cancel-btn">
                Hủy
            </button>
        </div>
    </form>
};

export default UserMainInformation;