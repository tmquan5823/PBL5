import React from "react";
import "./MoneyCard.css";



const MoneyCard = props => {
    var mark = props.money > 0 ? '+' : '';
    const money = mark + props.money.toLocaleString('vi-VN') + ' VNĐ';
    return <div className="money-card">
        <p className="money-card__title">{props.title}</p>
        <p className={`card__money-text ${props.money <= 0 && 'money-text--red'}
        ${props.money > 0 && 'money-text--green'} ${props.money == 0 && 'money-text--teal'}`}>
            {money}
        </p>
    </div>
};

export default MoneyCard;