import React from "react";
import "./TransactionItem.css";
import MoneyFormat from "../../../shared/help/MoneyFormat";
import { formatArrayDate } from "../../../shared/help/DateFormat";

const TransactionItem = props => {
    function clickHandler() {
        props.onClick(props.id);
    }

    return <div onClick={clickHandler} className="transaction-item">
        <div className="transaction-item__category">
            <div style={{ backgroundColor: props.color }} className="transaction-item__icon">
                <img src={props.icon || "/images/pig.png"} alt="" />
            </div>
            <span>{props.content}</span>
        </div>
        {props.showDate && <div className="transaction-item__date">
            <span>{formatArrayDate(props.date)}</span>
        </div>}
        <div className="transaction-item__note">
            <span>{props.note}</span>
        </div>
        <div className="transaction-item__money">
            <span className={`money--green ${props.money < 0 && 'money--red'}`}>{MoneyFormat(props.money)} VND</span>
        </div>
    </div>
};

export default TransactionItem;