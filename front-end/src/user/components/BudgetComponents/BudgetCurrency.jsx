import React, { useState } from "react";
import "./BudgetCurrency.css";

const BudgetCurrency = props => {
    return <div className="budget-currency">
        <label htmlFor="dropdown">Chọn một tùy chọn:</label>
        <select className="dropdown__currency" value={props.value} onChange={props.onChange}>
            <option value="">Chọn...</option>
            <option value="VND">VNĐ</option>
            <option value="USD">USD</option>
        </select>
    </div>
};

export default BudgetCurrency;