import React, { useState } from "react";
import "./TransactionHistory.css";
import TransactionItem from "./TransactionItem";
import UpdateTransactionForm from "./UpdateTransactionForm";
import SubModal from "../../../shared/components/UIElements/SubModal";
import { convertMonthFormat } from "../../../shared/help/DateFormat";
import { totalAmount } from "../../../shared/util/TransactionsCaculator";
import MoneyFormat from "../../../shared/help/MoneyFormat";

const TransactionHistory = props => {
    const [updateId, setUpdateId] = useState();
    const [showList, setShowList] = useState(true);
    function onUpdateHandler(id) {
        setUpdateId(id);
    }

    function closeHandler() {
        setUpdateId(null);
    }

    function onShowHandler() {
        setShowList(preval => !preval);
    }

    return <div className="transaction-history-container">
        <div onClick={onShowHandler} className="thc__header">
            <h3>{props.title}</h3>
            <img className={`${showList && 'rotateAnimation'} `} src="/images/down-arrow.png" alt="" />
            <h3 className="money-amount">{MoneyFormat(totalAmount(props.transactions, true) + totalAmount(props.transactions, false))} VND</h3>
        </div>
        {showList && <ul className="transaction-history">
            {props.transactions && props.transactions.map(item => <li key={item.id} className="transaction-history__item">
                {updateId === item.id ?
                    <SubModal
                        width="100%"
                        content={<UpdateTransactionForm
                            id={item.id}
                            color={item.category.iconColor}
                            category={item}
                            date={item.dateTransaction}
                            note={item.note}
                            money={item.amount}
                            endDate={item.dateEndCycle}
                            cycle={item.cycle}
                            onClose={closeHandler}
                            onUpdate={props.onUpdate}
                            onDelete={props.onDelete}
                            categories={props.categories}
                        />}
                        onClose={closeHandler}
                    />
                    :
                    <TransactionItem
                        onClick={onUpdateHandler}
                        id={item.id}
                        color={item.category.iconColor}
                        icon={item.category.iconUrl}
                        content={item.category.content}
                        note={item.note}
                        money={item.amount}
                        showDate={props.showDate}
                        date={item.dateTransaction.slice(0, 3)}
                    />}

            </li>
            )}
        </ul>}
    </div>
};

export default TransactionHistory;