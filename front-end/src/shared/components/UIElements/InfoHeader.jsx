import React, { useContext, useState, useEffect } from "react";
import "./InfoHeader.css";
import { AuthContext } from "../../context/auth-context";
import Wallets from "../../../user/models/Wallets";
import Wallet from "../../../user/components/OverviewComponents/Wallet";
import MoneyFormat from "../../help/MoneyFormat";
import NotificationContainer from "../NotificationElements/NotificationContainer";
import { useSelector, useDispatch } from "react-redux";
import { add, clear } from "../../../shared/util/deliveredNotifs"

const InfoHeader = props => {
    const auth = useContext(AuthContext);
    const [avatar, setAvatar] = useState(auth.avatarURL);
    const [userWallet, setUserWallet] = useState(auth.wallet);
    const [notificationState, setNotificationState] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const dispatch = useDispatch();

    const allDeliveredNotifs = useSelector(
        (state) => state.deliveredNotifs.value.notifs
    );

    const notifToastList = useSelector(
        (state) => state.deliveredNotifs.value.notifToastList
    );

    useEffect(() => {
        let notiState = false;
        for (let i = 0; i < allDeliveredNotifs.length; i++) {
            if (!allDeliveredNotifs[i].read) {
                notiState = true;
                break;
            }
            notiState = false;
        }
        setNotificationState(notiState);
    }, [allDeliveredNotifs]);



    useEffect(() => {
        let url = process.env.REACT_APP_URL + "/api/push-notifications/" + auth.userID;
        const sse = new EventSource(url);

        sse.addEventListener("user-list-event", (event) => {
            const data = JSON.parse(event.data);
            dispatch(clear());
            dispatch(add({ newNotifs: data }));
        });

        sse.onerror = () => {
            sse.close();
        };
        return () => {
            sse.close();
        };
    }, []);

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
            <div className="notification"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={`/images/${notificationState ? 'notification.gif' : 'notification.png'}`} alt="" />
                {isHovered && <NotificationContainer
                    notifications={allDeliveredNotifs}
                />}
            </div>
            <div className="user-avatar">
                <img src={avatar} alt="" />
            </div>
        </div>
    </div>
};

export default InfoHeader;