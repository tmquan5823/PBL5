
import React, { useEffect, useState } from "react";
import "./DatePickerComponent.css";
import DatePicker from 'react-datepicker';

const DatePickerComponent = props => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    const [startDate, setStartDate] = useState(startOfMonth);
    const [endDate, setEndDate] = useState(endOfMonth);

    function startDateChangeHandler(date) {
        setStartDate(date);
        if (endDate && endDate < date) {
            setEndDate(date); // Auto-adjust endDate if it's less than startDate
        }
    }

    function endDateChangeHandler(date) {
        if (startDate && date >= startDate) {
            setEndDate(date);
        } else {
            setEndDate(startDate);
        }
    }

    useEffect(() => {
        props.onChange(startDate, endDate);
    }, [startDate, endDate]);

    function descMonthHandler() {
        const newStartDate = new Date(startDate);
        newStartDate.setMonth(newStartDate.getMonth() - 1);
        newStartDate.setDate(1);
        setStartDate(newStartDate);

        const newEndDate = new Date(newStartDate);
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        newEndDate.setDate(0);
        setEndDate(newEndDate);
    }

    function ascMonthHandler() {
        const newStartDate = new Date(startDate);
        newStartDate.setMonth(newStartDate.getMonth() + 1);
        newStartDate.setDate(1);
        setStartDate(newStartDate);

        const newEndDate = new Date(newStartDate);
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        newEndDate.setDate(0);
        setEndDate(newEndDate);
    }


    return <div className="datepicker-component">
        <button onClick={descMonthHandler}>&lt;</button>
        <DatePicker
            selected={startDate}
            onChange={startDateChangeHandler} />
        <span>-</span>
        <DatePicker
            selected={endDate}
            onChange={endDateChangeHandler} />
        <button onClick={ascMonthHandler} >&gt;</button>
    </div >
};

export default DatePickerComponent;