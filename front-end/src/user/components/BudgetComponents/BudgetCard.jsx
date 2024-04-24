import React from "react";
import "./BudgetCard.css";

const BudgetCard = props => {
    return <div className="budget-card">
        <h3 className="budget__title">
            {props.title}
        </h3>
        <p className="budget__wallet">
            {props.wallet}
        </p>
        <p className="budget__money-left">
            {props.moneyLeft}
        </p>
    </div>
};

export default BudgetCard;