import React from "react";
import "./ProgressBar.css";

const ProgressBar = props => {
    var roundedNumber = Math.round(props.percent * 10) / 10; // Làm tròn đến 1 chữ số thập phân
    var percentage = roundedNumber.toFixed(1);
    return <div className="progress-bar">
        <div className="progress" style={{ width: `${percentage}%` }}>
            <p className="progress-text"> {percentage}%</p>
        </div>
    </div>
};

export default ProgressBar;