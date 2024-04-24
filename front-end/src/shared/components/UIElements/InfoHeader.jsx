import React from "react";
import "./InfoHeader.css";

const InfoHeader = props => {
    return <div className="info-header">
        <p className="info-header__title">
            {props.title}
        </p>
        <div className="info-header__user">
            <div className="notification">
                <img src="/images/bell.png" alt="" />
            </div>
            <div className="user-avatar">
            </div>
        </div>
    </div>
};

export default InfoHeader;