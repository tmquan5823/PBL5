import React from "react";
import "./UserItem.css";

const UserItem = props => {
    return <div className="user__item">
        <img src={props.avt || '/images/pig.png'} alt="" />
        <span>{props.name}</span>
    </div>
};

export default UserItem;