import React from "react";
import "./UserCard.css";

const UserCard = props => {
    return <div className="user-card">
        <img src={props.image || "/images/pig.gif"} alt="" />
        <div className="user-card__info">
            <div className="user-card__info--header">
                <span className="user-card__name">
                    {props.name}
                </span>
                <span className="user-card__role">
                    {props.role}
                </span>
            </div>
            <span className="user-card__email">
                {props.email}
            </span>
        </div>
    </div>
};

export default UserCard;