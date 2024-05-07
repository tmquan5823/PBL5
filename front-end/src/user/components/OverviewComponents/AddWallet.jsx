import React, { useContext, useState } from "react";
import "./AddWallet.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/util/validators";
import UserCard from "../../../shared/components/UIElements/UserCard";
import { AuthContext } from "../../../shared/context/auth-context";

const AddWallet = props => {
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

    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm({
        wallet_name: {
            value: "",
            isValid: false
        },
        money_source: {
            value: "",
            isValid: false
        },
        initial_money: {
            value: "",
            isValid: false
        },
        currency: {
            value: "",
            isValid: false
        }
    }, false);

    return <form action="" className="wallet-form">
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
            <button className="wallet-form__save-btn">Lưu</button>
            <button className="wallet-form__cancel-btn">Hủy</button>
        </div>
    </form>
};

export default AddWallet;