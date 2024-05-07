import React, { useContext, useState, useEffect } from "react";
import "./InfoHeader.css";
import { AuthContext } from "../../context/auth-context";

const InfoHeader = props => {
    const auth = useContext(AuthContext);
    const [avatar, setAvatar] = useState(auth.avatarURL);
    const [notificationState, setNotificationState] = useState(true);
    useEffect(() => {
        setAvatar(auth.avatarURL);
    }, [auth.avatarURL]);

    return <div className="info-header">
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