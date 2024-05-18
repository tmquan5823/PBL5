import React from "react";
import "./ProgressBar.css";

const ProgressBar = props => {
    var roundedNumber = Math.round(props.percent * 10) / 10; // Làm tròn đến 1 chữ số thập phân
    var percentage = roundedNumber.toFixed(1);
    var percent = percentage;
    if (props.percent < 0) {
        percent = 100 - percent;
    }
    return <div className="progress-bar">
        <div className={`progress ${percent >= 100 && 'progress--red'} `} style={{ width: `${(percent > 100) ? '100' : percent}%` }}>
            <p className="progress-text"> {percent}%</p>
        </div>
    </div>
};

export default ProgressBar;