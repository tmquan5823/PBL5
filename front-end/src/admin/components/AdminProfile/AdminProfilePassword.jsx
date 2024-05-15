import React, { useState, useEffect, useContext } from "react";
import "./AdminProfilePassword.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../../shared/util/validators";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import StateModalCard from "../../../shared/components/UIElements/StateModalCard";

const AdminProfilePassword = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [updateFail, setUpdateFail] = useState();
    const [showModal, setShowModal] = useState();
    const [message, setMessage] = useState("");
    const [formState, inputHandler, setFormData] = useForm({
        current_password: {
            value: "",
            isValid: false
        },
        new_password: {
            value: "",
            isValid: false
        },
        confirm_password: {
            value: "",
            isValid: false
        }
    }, false);

    useEffect(() => {
        setFormData(formState.inputs, formState.isValid && (formState.inputs.new_password.value === formState.inputs.confirm_password.value));
    }, [formState.inputs.new_password.value, formState.inputs.confirm_password.value]);

    async function updatePasswordHandler(event) {
        event.preventDefault();
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/password", "PUT",
                {
                    currentPassword: formState.inputs.current_password.value,
                    newPassword: formState.inputs.new_password.value
                },
                {
                    'Authorization': "Bearer " + auth.token
                });
            if (!resData.state) {
                setUpdateFail(true);
            }
            setFormData({
                current_password: {
                    value: "",
                    isValid: false
                },
                new_password: {
                    value: "",
                    isValid: false
                },
                confirm_password: {
                    value: "",
                    isValid: false
                }
            }, false);
            setShowModal(true);
            setMessage(resData.message);
        } catch (err) {
            console.log(err);
        }
    }

    function closeModalHandler() {
        setShowModal(false);
        clearError();
    }

    function cancelUpdateHandler() {
        setFormData({
            current_password: {
                value: "",
                isValid: false
            },
            new_password: {
                value: "",
                isValid: false
            },
            confirm_password: {
                value: "",
                isValid: false
            }
        }, false);
    }


    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <StateModalCard
            show={showModal || updateFail}
            onCancel={closeModalHandler}
            state={error ? 'error' : (updateFail ? 'fail' : 'success')}
            message={message}
        />
        <form action="" className="user-profile-password">
            <h2>Đổi mật khẩu</h2>
            <Input id="current_password"
                text="Mật khẩu hiện tại"
                element="input"
                validators={[VALIDATOR_REQUIRE()]}
                type="password"
                value={formState.inputs.current_password.value}
                onInput={inputHandler}
                width="90%" />
            <div className="user-profile__row">
                <Input id="new_password"
                    text="Mật khẩu mới"
                    element="input"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    type="password"
                    value={formState.inputs.new_password.value}
                    errorText="Mật khẩu ít nhất 8 kí tự!"
                    onInput={inputHandler}
                    width="48%" />
                <div className="confirm-password-container">
                    <Input id="confirm_password"
                        text="Xác nhận mật khẩu"
                        element="input"
                        value={formState.inputs.confirm_password.value}
                        validators={[VALIDATOR_REQUIRE()]}
                        type="password"
                        onInput={inputHandler}
                        width="100%" />
                    {formState.inputs.new_password.value !== formState.inputs.confirm_password.value && <label className="password-confirm--invalid">Mật khẩu xác thực không khớp!</label>}
                </div>
            </div>
            {formState.isValid && <div className="buttons-container">
                <button onClick={updatePasswordHandler} className="save-btn">
                    Lưu
                </button>
                <button onClick={cancelUpdateHandler} className="cancel-btn">
                    Hủy
                </button>
            </div>}
        </form>
    </React.Fragment>
};

export default AdminProfilePassword;