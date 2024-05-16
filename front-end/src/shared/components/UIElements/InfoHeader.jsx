import React, { useContext, useState, useEffect } from "react";
import "./InfoHeader.css";
import { AuthContext } from "../../context/auth-context";
import Wallets from "../../../user/models/Wallets";
import Wallet from "../../../user/components/OverviewComponents/Wallet";
import MoneyFormat from "../../help/MoneyFormat";

const InfoHeader = props => {
    const auth = useContext(AuthContext);
    const [avatar, setAvatar] = useState(auth.avatarURL);
    const [userWallet, setUserWallet] = useState(auth.wallet);
    const [notificationState, setNotificationState] = useState(true);

    useEffect(() => {
        setAvatar(auth.avatarURL);
    }, [auth.avatarURL]);

    useEffect(() => {
        setUserWallet(auth.wallet);
    }, [auth.wallet]);


    return <div className={`info-header ${auth.role === 'ADMIN' && 'info-header--admin'}`}>
        {userWallet &&
            <div className="info-header__wallet">
                <img src="/images/wallet2.gif" alt="" />
                <div className="wallet-info">
                    <span className="wallet-name">{userWallet.walletName}</span>
                    <span className="wallet-money">{MoneyFormat(userWallet.moneyLeft || 0)}VND</span>
                </div>
                <div className="wallet-detail">
                    <Wallet
                        name={userWallet.walletName}
                        money={userWallet.moneyLeft || 0}
                    />
                </div>
            </div>}
        <p className="info-header__title">
            {props.title}
        </p>
        <div className="info-header__user">
            <div className="notification">
                <img src={`/images/${notificationState ? 'notification-bell.gif' : 'notification-bell.png'}`} alt="" />
            </div>
            <div className="user-avatar">
                <img src={avatar} alt="" />
            </div>
        </div>
    </div>
};

export default InfoHeader;