import React, { useContext } from "react";
import "./UserProfileHeader.css";
import { AuthContext } from "../../../shared/context/auth-context";

const UserProfileHeader = props => {
    const auth = useContext(AuthContext);
    return <div className="user-profile-header">
        <div className="user-avatar">
            <img src={auth.avatarURL} alt="" />
        </div>
        <div className="avatar-btn__container">
            <button className="new-avatar__btn">Tải ảnh mới</button>
            <button className="delete-avatar__btn">Xóa ảnh</button>
        </div>
    </div>
};

export default UserProfileHeader;