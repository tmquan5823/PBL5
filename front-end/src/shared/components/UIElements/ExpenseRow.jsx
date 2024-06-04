import React from "react";
import "./ExpenseRow.css";
import MoneyCard from "./MoneyCard";

const ExpenseRow = props => {
    if (props.expense)
        return <ul className="expense-list">
            {props.expense.map((item) => (
                <li className="expense-item" key={item.title}>
                    <MoneyCard title={item.title} money={item.money} no_mark={item.no_mark} perDay={item.perDay} />
                </li>
            ))}
        </ul>
    else
        return <div>Nothing!!!!</div>
};

export default ExpenseRow;