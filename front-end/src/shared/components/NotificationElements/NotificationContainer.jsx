import React, { useEffect } from "react";
import "./NotificationContainer.css";
import NotificationItem from "./NotificationItem";

const NotificationContainer = props => {

    console.log(props.notifications);

    return <div className="notification-container">
        <span className="notification__title">Thông báo</span>
        {props.notifications.length > 0 ? props.notifications.map(item => {
            return <NotificationItem
                onNotiClick={props.onNotiClick}
                item={item}
            />
        }) :
            <div className="no-notification">
                <img src="/images/no-alarm.png" alt="" />
                <span>Không có thông báo!</span>
            </div>}
    </div>
};

export default NotificationContainer;