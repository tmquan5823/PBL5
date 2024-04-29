import React, { useContext } from "react";
import "./InfoHeader.css";
import { AuthContext } from "../../context/auth-context";

const InfoHeader = props => {
    const auth = useContext(AuthContext);
    return <div className="info-header">
        <p className="info-header__title">
            {props.title}
        </p>
        <div className="info-header__user">
            <div className="notification">
                <img src={"/images/bell.png"} alt="" />
            </div>
            <div className="user-avatar">
                <img src={auth.avatarURL} alt="" />
            </div>
        </div>
    </div>
};

export default InfoHeader;