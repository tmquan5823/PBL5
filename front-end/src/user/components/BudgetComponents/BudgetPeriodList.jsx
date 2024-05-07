import React, { useState } from 'react';
import './BudgetPeriodList.css'; // Import CSS file for styling

function BudgetPeriodList(props) {
    const [selectedValue, setSelectedValue] = useState(null);
    const periods = [{
        title: "Một lần",
        value: "once"
    },
    {
        title: "Hàng ngày",
        value: "everyday"
    },
    {
        title: "Hàng tuần",
        value: "everyweek"
    },
    {
        title: "Hàng tháng",
        value: "everymonth"
    },];

    function handleInputChange(event) {
        setSelectedValue(event.target.value);
        if (props.onChange) {
            props.onChange(event.target.value);
        }
    }

    return (
        <div>
            <label>Lặp lại</label>
            <div className="radio-buttons-container">
                {periods.map((item) => (
                    <label key={item.value} className={`radio-button ${selectedValue === item.value && 'radio-button--active'}`}>
                        <input
                            className={`radio-button__input`}
                            type="radio"
                            value={item.value}
                            checked={props.value === item.value}
                            onChange={handleInputChange}
                        />
                        {item.title}
                    </label>)
                )}
            </div>
        </div>
    );
}

export default BudgetPeriodList;