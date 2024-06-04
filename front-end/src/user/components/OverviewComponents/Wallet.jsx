import React from "react";
import "./Wallet.css";
import MoneyFormat from "../../../shared/help/MoneyFormat";

const Wallet = props => {
    return <div className="wallet">
        <img src="/images/wallet.gif" alt="" />
        <div className="wallet__info">
            <p>{props.name}</p>
            <p className="fade-text">Tất cả ví</p>
            <p className="money-text money-text--red ">{MoneyFormat(props.money)} VND</p>
        </div>
    </div>
};

export default Wallet;