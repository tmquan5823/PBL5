import React, { useContext, useState, useEffect } from "react";
import "./WalletSettingForm.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/util/validators";
import UserCard from "../../../shared/components/UIElements/UserCard";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import StateModalCard from "../../../shared/components/UIElements/StateModalCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal } from "antd"
import { errorNotification, successNotification, warningNotification } from "../../../shared/components/UIElements/Warning";


const WalletSettingForm = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [updateState, setUpdateState] = useState();
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const history = useHistory();
    const money_sources = [{
        label: "Tiền mặt",
        value: "cash",
    }];

    const currency = [{
        label: "VNĐ",
        value: "vnd",
    }, ,
    {
        label: "USD",
        value: "usd",
    },];

    const [formState, inputHandler, setFormData] = useForm({
        wallet_name: {
            value: auth.wallet.walletName || "",
            isValid: true
        },
        money_source: {
            value: "",
            isValid: true
        },
        initial_money: {
            value: auth.wallet.moneyAtFirst.toString() || "",
            isValid: true
        },
        currency: {
            value: "",
            isValid: true
        }
    }, true);

    async function confirmDeleteHandler() {
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/wallet/" + auth.wallet.id, "DELETE", null, {
                'Authorization': "Bearer " + auth.token
            });
            if (!resData.state) {
                errorNotification(resData.message);
            } else {
                auth.setWallet(null);
                history.push("/user/overview");
                successNotification(resData.message);
            }
            hideModal();
        } catch (err) {
            console.log(err);
            errorNotification(err);
        }
    }

    useEffect(() => {
        if (formState.inputs.wallet_name.value != auth.wallet.walletName ||
            formState.inputs.initial_money.value != auth.wallet.moneyAtFirst) {
            setUpdateState(true);
        }
        else {
            setUpdateState(false);
        }
    }, [formState]);

    function cancelUpdateHandler() {
        setFormData({
            wallet_name: {
                value: auth.wallet.walletName || "",
                isValid: true
            },
            money_source: {
                value: "",
                isValid: true
            },
            initial_money: {
                value: auth.wallet.moneyAtFirst.toString() || "",
                isValid: true
            },
            currency: {
                value: "",
                isValid: true
            }
        }, true);
    }

    async function updateHandler(event) {
        event.preventDefault();
        try {
            const responseData = await sendRequest(process.env.REACT_APP_URL + '/api/user/wallet', 'PUT',
                JSON.stringify({
                    wallet_id: auth.wallet.id,
                    wallet_name: formState.inputs.wallet_name.value,
                    money_at_first: formState.inputs.initial_money.value,
                }), {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.token
            });
            console.log(responseData);
            if (responseData.state) {
                auth.setWallet({
                    ...auth.wallet,
                    moneyAtFirst: responseData.money_at_first,
                    walletName: responseData.wallet_name,
                    moneyLeft: responseData.money_left
                })
                setUpdateState(false);
                successNotification(responseData.message)
            } else {
                warningNotification(responseData.message)
            }
        } catch (err) {
            errorNotification(err)
            console.log(err);
        }
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <Modal
            title="Modal"
            open={open}
            onOk={confirmDeleteHandler}
            onCancel={hideModal}
            okText="Xóa"
            cancelText="Hủy"
        >
            <p>Bạn có thực sự muốn xóa ví này?</p>
        </Modal>
        <div className="wallet-setting-container">
            <div className="wallet-setting-form">
                <h3>Thông tin chung</h3>
                <div className="wallet-form__row">
                    <Input id="wallet_name"
                        text="Tên"
                        element="input"
                        type="text"
                        value={formState.inputs.wallet_name.value}
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        width="48%"
                    />
                    <Input id="money_source"
                        text="Nguồn tiền"
                        element="select"
                        value={formState.inputs.money_source.value}
                        onInput={inputHandler}
                        width="48%"
                        options={money_sources}
                    />
                </div>
                <div className="wallet-form__row">
                    <Input id="initial_money"
                        text="Số dư ban đầu"
                        element="input"
                        type="text"
                        numberOnly
                        value={formState.inputs.initial_money.value}
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        width="48%"
                    />
                    <Input id="currency"
                        text="Đơn vị tiền tệ"
                        element="select"
                        value={formState.inputs.currency.value}
                        onInput={inputHandler}
                        options={currency}
                        width="48%"
                        initialIsValid={true}
                    />
                </div>
                {updateState && <div className="update-wallet__buttons">
                    <button onClick={updateHandler} className="wallet-form__save-btn">Cập nhật ví</button>
                    <button onClick={cancelUpdateHandler} className="wallet-form__cancel-btn">Hủy</button>
                </div>}
                <h3>Thành viên ví</h3>
                <div className="wallet-form__row">
                    <UserCard
                        image={auth.avatarURL}
                        name="Trần Minh Quân"
                        email="tmquan5823@gmail.com"
                        role="Chủ sở hữu"
                    />
                </div>
            </div>
            <h3 className="wallet-setting__delete"><a onClick={showModal} href="#">Xóa ví</a></h3>
        </div>
    </React.Fragment>
};

export default WalletSettingForm;