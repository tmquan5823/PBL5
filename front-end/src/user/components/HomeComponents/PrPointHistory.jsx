import React from "react";
import "./PrPointHistory.css";

const PrPointHistory = props => {
    return <div className="prHistory__Container">
        <div className="prHistory__title">
            <h2>Xem lại lịch sử chi tiêu </h2>
            <h2 className="teal-color">rõ ràng hơn </h2>
        </div>
        <div className="prHistory__chart">
            <img src="/images/home-history-chart.png" alt="" />
        </div>
        <div className="prHistory__table">
            <img src="/images/home-history-table.png" alt="" />
        </div>
    </div>
};

export default PrPointHistory;