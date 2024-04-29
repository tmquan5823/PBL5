import React, { useState } from 'react';
import './BudgetPeriodList.css'; // Import CSS file for styling

function BudgetPeriodList(props) {
    return (
        <div>
            <label>Lặp lại</label>
            <div className="radio-buttons-container">
                <label className="radio-button">
                    <input
                        className="radio-button__input"
                        type="radio"
                        value="option1"
                        checked={props.value === "option1"}
                        onChange={props.onChange}
                    />
                    Một lần
                </label>
                <label className="radio-button">
                    <input
                        className="radio-button__input"
                        type="radio"
                        value="option2"
                        checked={props.value === "option2"}
                        onChange={props.onChange}
                    />
                    Hàng ngày
                </label>
                <label className="radio-button">
                    <input
                        className="radio-button__input"
                        type="radio"
                        value="option3"
                        checked={props.value === "option3"}
                        onChange={props.onChange}
                    />
                    Hàng tuần
                </label>
                <label id='option4' className="radio-button1">
                    <input
                        for="option4"
                        className="radio-button__input1"
                        type="radio"
                        value="option4"
                        checked={props.value === "option4"}
                        onChange={props.onChange}
                    />
                    Hàng tuần
                </label>
            </div>
        </div>
    );
}

export default BudgetPeriodList;