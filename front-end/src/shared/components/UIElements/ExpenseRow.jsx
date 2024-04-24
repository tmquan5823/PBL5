import React from "react";
import "./ExpenseRow.css";
import MoneyCard from "./MoneyCard";

const ExpenseRow = props => {
    return <ul className="expense-list">
        {props.expense.map((item) => (
            <li className="expense-item">
                <MoneyCard title={item.title} money={item.money} />
            </li>
        ))}
    </ul>
};

export default ExpenseRow;