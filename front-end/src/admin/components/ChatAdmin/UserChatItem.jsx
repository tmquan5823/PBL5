import React from "react";
import "./UserChatItem.css";

const UserChatItem = props => {
    return <div className="user-chat-item">
        <div className="uci__image-container">
            <img src={props.avatar} alt="" />
        </div>
        <div className="uci__content">
            <span className="uci__name">{props.name}</span>
            <span className="uci__message">{props.message}</span>
        </div>
    </div>
};

export default UserChatItem;