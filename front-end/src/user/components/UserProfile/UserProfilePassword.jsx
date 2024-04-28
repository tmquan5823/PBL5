import React from "react";
import "./UserProfilePassword.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";

const UserProfilePassword = props => {
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

    return <form action="" className="user-profile-password">
        <h2>Đổi mật khẩu</h2>
        <Input id="current-password"
            text="Mật khẩu hiện tại"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            type="text"
            onInput={inputHandler}
            width="90%" />
        <div className="user-profile__row">
            <Input id="new-password"
                text="Mật khẩu mới"
                element="input"
                validators={[VALIDATOR_REQUIRE()]}
                type="text"
                onInput={inputHandler}
                width="48%" />
            <Input id="confirm-password"
                text="Xác nhận mật khẩu"
                element="input"
                validators={[VALIDATOR_REQUIRE()]}
                type="text"
                onInput={inputHandler}
                width="48%" />
        </div>
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

export default UserProfilePassword;