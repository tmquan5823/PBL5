import React from "react";
import "./HomePrFeature.css";
import Card from "../../../shared/components/UIElements/Card";

const HomePrFeature = props => {
    return <div className="feature-container">
        <h1 className="feature__title">Các tính năng <p className="teal-color">nổi bật</p></h1>
        <div className="feature__row">
            <Card title="Bảo mật và an toàn" image="shield.png" />
            <Card title="Giao diện thân thiện" image="interface.png" />
        </div>
        <div className="feature__row">
            <Card title="Quản lý hiệu quả" image="sales.png" />
            <Card title="Hỗ trợ và tư vấn" image="help-desk.png" />
        </div>
    </div>
};

export default HomePrFeature;