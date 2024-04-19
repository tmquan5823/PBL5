import React from "react";
import "./HomeImage.css";
import Button from "../../../shared/components/FormElements/Button";

const HomeImage = props => {
    return <div className="image-container">
        <div className="image-content">
            <p className="home-title">
                <h1 className="white-color">Hỗ trợ bạn</h1><h1 className="teal-color"> quản lý tài chính cá nhân một cách </h1><h1 className="white-color">đơn giản nhất</h1>
            </p>
            <Button to="/login" confirm>Login</Button>
        </div>
    </div>
};

export default HomeImage;