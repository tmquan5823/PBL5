import React from "react";
import { Link } from "react-router-dom";
import "./BudgetCard.css";
import ProcessBar from "../../../shared/components/UIElements/ProgressBar";
import { DateFormat } from "../../../shared/help/DateFormat";
import { formatArrayDate2 } from "../../../shared/help/DateFormat";

const BudgetCard = props => {
    const moneyLeft = (props.money + props.moneySpend).toLocaleString('vi-VN') + ' VNĐ';
    const money = props.money.toLocaleString('vi-VN') + ' VNĐ';

    return <Link to={`/user/budget/${props.id}`}>
        <div className="budget-card">
            <h3 className="budget__title">
                {props.title}
            </h3>
            <p className="budget__wallet">
                Tất cả các ví
            </p>
            <p className="budget__money-left">
                <p className="teal-color">{moneyLeft}</p> left
            </p>
            <p className="budget__money">
                From <p className="green-color">{money}</p>
            </p>
            <ProcessBar percent={(props.money + props.moneySpend) / props.money * 100} />
            <div className="budget__date">
                <p>{formatArrayDate2((props.start))}</p>
                <p>{formatArrayDate2((props.end))}</p>
            </div>
        </div>
    </Link>
};

export default BudgetCard;