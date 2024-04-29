import React from "react";
import "./ProgressBar.css";

const ProgressBar = props => {
    return <div className="progress-bar">
        <div className="progress" style={{ width: `${props.percent}%` }}>
            <p className="progress-text"> {props.percent}%</p>
        </div>
    </div>
};

export default ProgressBar;