import React, { useContext } from "react";
import "./WalletSettingForm.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/util/validators";
import UserCard from "../../../shared/components/UIElements/UserCard";
import { AuthContext } from "../../../shared/context/auth-context";

const WalletSettingForm = props => {
    const auth = useContext(AuthContext);

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
    
    return <div className="wallet-setting-container">
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
            <div className="update-wallet__buttons">
                <button className="wallet-form__save-btn">Cập nhật ví</button>
                <button className="wallet-form__cancel-btn">Hủy</button>
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
        </div>
        <h3 className="wallet-setting__delete"><a href="">Xóa ví</a></h3>
    </div>
};

export default WalletSettingForm;