import React, { useState, useEffect } from "react";
import "./StateCard.css";

const StateCard = props => {
    function closeHandler() {
        props.onClose();
    }

    return <div className={`state-card ${props.state == 'fail' && 'state-card--fail'} ${props.state == 'success' && 'state-card--success'} ${props.state == 'error' && 'state-card--error'}`}   >
        <div className="exit-btn">
            <button onClick={closeHandler}>x</button>
        </div>
        <img src={`/images/${props.state == 'fail' ? 'sad-face.png' : ""}${props.state == 'error' ? 'face.png' : ""}`} alt="" />
        <h2>{`${props.state == 'fail' ? 'FAIL' : ""} ${props.state == 'success' ? 'SUCCESS' : ""} ${props.state == 'error' ? 'ERROR' : ""}`}</h2>
        <p>{props.message || ""}</p>
    </div>
};

export default StateCard;