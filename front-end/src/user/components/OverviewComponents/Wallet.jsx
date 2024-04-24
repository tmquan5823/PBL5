import React from "react";
import "./Wallet.css";

const Wallet = props => {
    return <div className="wallet">
        <h2>Ví</h2>
        <div className="wallet__content">
            <img src="/images/wallet.png" alt="" />
            <div className="wallet__info">
                <p>Ví tiền mặt</p>
                <p className="fade-text">Tiền mặt</p>
                <p className="money-text money-text--red ">-1,000,000 VNĐ</p>
            </div>
        </div>
    </div>
};

export default Wallet;