import React, { useContext, useState } from "react";
import "./AddWallet.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/util/validators";
import UserCard from "../../../shared/components/UIElements/UserCard";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const AddWallet = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    const money_sources = [{
        label: "Tiền mặt",
        value: "cash",
    }];

    const currency = [{
        label: "VNĐ",
        value: "vnd",
    }];

    const [formState, inputHandler] = useForm({
        wallet_name: {
            value: "",
            isValid: false
        },
        initial_money: {
            value: "",
            isValid: false
        },

    }, false);

    async function addWalletHandler(event) {
        event.preventDefault();
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/wallet", 'POST',
                JSON.stringify({
                    wallet_name: formState.inputs.wallet_name.value,
                    money_at_first: formState.inputs.initial_money.value,
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + auth.token
                });
            if (resData.state) {
                props.onClose();
                props.onWalletAdded({
                    "id": resData.wallet_id,
                    "walletName": resData.wallet_name,
                    "moneyAtFirst": resData.money_at_first,
                    "moneyLeft": resData.money_left
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <form action="" className="wallet-form">
            <h2>Thêm ví mới</h2>
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
            </div>
            <h3>Thành viên ví</h3>
            <div className="wallet-form__row">
                <UserCard
                    image={auth.avatarURL}
                    name="Trần Minh Quân"
                    email="tmquan5823@gmail.com"
                    role="Chủ sở hữu"
                />
            </div>
            <div className="add-wallet__button">
                <button onClick={addWalletHandler} disabled={!formState.isValid} className={`wallet-form__save-btn ${!formState.isValid && 'wallet-form--invalid'}`}>Lưu</button>
                <button onClick={(event) => { event.preventDefault(); props.onClose(); }} className="wallet-form__cancel-btn">Hủy</button>
            </div>
        </form>
    </React.Fragment>
};

export default AddWallet;