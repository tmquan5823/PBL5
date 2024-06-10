import React, { useState, useEffect, useContext } from "react";
import "./UserMainInformation.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_MIN, VALIDATOR_START_WITH } from "../../../shared/util/validators";
import DatePicker from 'react-datepicker';
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import { successNotification, errorNotification, warningNotification } from "../../../shared/components/UIElements/Warning";

const UserMainInformation = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [userinfo, setUserinfo] = useState();
    const [updateState, setUpdateState] = useState(false);
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
        phone_num: {
            value: "",
            isValid: false
        },
        date_of_birth: {
            value: new Date(),
            isValid: false
        },
        address: {
            value: "",
            isValid: false
        },
    }, false);

    async function fetchData() {
        try {
            const responseData = await sendRequest(process.env.REACT_APP_URL + '/api/user', 'GET', null,
                {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + auth.token
                });

            if (responseData.state) {
                let birthday;
                if (!responseData.date_of_birth) {
                    birthday = new Date();
                } else {
                    birthday = new Date(responseData.date_of_birth);
                }
                setUserinfo({
                    first_name: {
                        value: responseData.first_name,
                        isValid: true
                    },
                    last_name: {
                        value: responseData.last_name,
                        isValid: true
                    },
                    email: {
                        value: responseData.email,
                        isValid: true
                    },
                    phone_num: {
                        value: responseData.phone_num || "",
                        isValid: true
                    },
                    date_of_birth: {
                        value: birthday,
                        isValid: true
                    },
                    address: {
                        value: responseData.address || "",
                        isValid: true
                    },
                });
                setFormData({
                    first_name: {
                        value: responseData.first_name,
                        isValid: true
                    },
                    last_name: {
                        value: responseData.last_name,
                        isValid: true
                    },
                    email: {
                        value: responseData.email,
                        isValid: true
                    },
                    phone_num: {
                        value: responseData.phone_num || "",
                        isValid: true
                    },
                    date_of_birth: {
                        value: birthday,
                        isValid: true
                    },
                    address: {
                        value: responseData.address || "",
                        isValid: true
                    },
                }, false);
                setUpdateState(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (JSON.stringify(formState.inputs) !== JSON.stringify(userinfo)) {
            setUpdateState(true);
        } else {
            setUpdateState(false);
        }
    }, [formState]);

    function inputChangeHandler(id, value, isValid) {
        inputHandler(id, value, isValid);
    }

    function cancelUpdateHandler(event) {
        event.preventDefault();
        let birthday;
        if (!userinfo.date_of_birth.value) {
            birthday = new Date();
        } else {
            birthday = new Date(userinfo.date_of_birth.value);
        }
        setFormData({
            first_name: {
                value: userinfo.first_name.value,
                isValid: true
            },
            last_name: {
                value: userinfo.last_name.value,
                isValid: true
            },
            email: {
                value: userinfo.email.value,
                isValid: true
            },
            phone_num: {
                value: userinfo.phone_num.value || "",
                isValid: true
            },
            date_of_birth: {
                value: birthday,
                isValid: true
            },
            address: {
                value: userinfo.address.value || "",
                isValid: true
            },
        }, false);
        setUpdateState(false);
    }

    async function submitUpdateHandler(event) {
        event.preventDefault();
        try {
            const responseData = await sendRequest(process.env.REACT_APP_URL + '/api/user', 'PUT',
                JSON.stringify({
                    firstname: formState.inputs.first_name.value,
                    lastname: formState.inputs.last_name.value,
                    telephone: formState.inputs.phone_num.value,
                    address: formState.inputs.address.value,
                    dateOfBirth: formState.inputs.date_of_birth.value
                }), {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.token
            });
            if (responseData.state) {
                let birthday;
                if (!formState.inputs.date_of_birth.value) {
                    birthday = new Date();
                } else {
                    birthday = new Date(formState.inputs.date_of_birth.value);
                }
                setUserinfo({
                    first_name: {
                        value: formState.inputs.first_name.value,
                        isValid: true
                    },
                    last_name: {
                        value: formState.inputs.last_name.value,
                        isValid: true
                    },
                    email: {
                        value: formState.inputs.email.value,
                        isValid: true
                    },
                    phone_num: {
                        value: formState.inputs.phone_num.value || "",
                        isValid: true
                    },
                    date_of_birth: {
                        value: birthday,
                        isValid: true
                    },
                    address: {
                        value: formState.inputs.address.value || "",
                        isValid: true
                    },
                });
                setUpdateState(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (!userinfo) {
        return <LoadingSpinner asOverlay />;
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <form className="main-infor">
            <div className="main-infor__row">
                <Input id="first_name"
                    text="Họ"
                    element="input"
                    type="text"
                    value={formState.inputs.first_name.value}
                    onInput={inputChangeHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    width="48%"
                    initialIsValid={true}
                />
                <Input id="last_name"
                    text="Tên"
                    element="input"
                    type="text"
                    onInput={inputChangeHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    width="48%"
                    value={formState.inputs.last_name.value}
                    initialIsValid={true} />
            </div>
            <Input id="email"
                text="Email"
                element="input"
                type="text"
                disabled
                validators={[VALIDATOR_EMAIL()]}
                onInput={inputChangeHandler}
                width="90%"
                value={formState.inputs.email.value}
                initialIsValid={true} />
            <div className="main-infor__row">
                <Input id="date_of_birth"
                    text="Ngày sinh"
                    element="datepicker"
                    onInput={inputChangeHandler}
                    width="48%"
                    value={formState.inputs.date_of_birth.value}
                    initialIsValid={true} />
                <Input id="phone_num"
                    text="Số điện thoại"
                    element="input"
                    type="text"
                    numberOnly
                    onInput={inputChangeHandler}
                    validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_START_WITH('0')]}
                    width="48%"
                    errorText="Số điện thoại không hợp lệ!"
                    value={formState.inputs.phone_num.value}
                    initialIsValid={true} />
            </div>
            <Input id="address"
                text="Địa chỉ"
                element="input"
                type="text"
                onInput={inputChangeHandler}
                width="90%"
                value={formState.inputs.address.value}
                initialIsValid={true} />
            {(updateState && formState.isValid) && (
                <div className="buttons-container">
                    <button onClick={submitUpdateHandler} className="save-btn">
                        Lưu
                    </button>
                    <button onClick={cancelUpdateHandler} className="cancel-btn">
                        Hủy
                    </button>
                </div>)}
        </form>
    </React.Fragment>
};

export default UserMainInformation;