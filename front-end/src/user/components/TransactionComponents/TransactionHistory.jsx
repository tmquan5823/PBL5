import React, { useState } from "react";
import "./TransactionHistory.css";
import TransactionItem from "./TransactionItem";
import UpdateTransactionForm from "./UpdateTransactionForm";
import SubModal from "../../../shared/components/UIElements/SubModal";
import { convertMonthFormat } from "../../../shared/help/DateFormat";

const TransactionHistory = props => {
    const [updateId, setUpdateId] = useState();
    function onUpdateHandler(id) {
        setUpdateId(id);
    }

    function closeHandler() {
        setUpdateId(null);
    }

    return <ul className="transaction-history">
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
                    key={item.id}
                    color={item.category.iconColor}
                    icon={item.category.iconUrl}
                    content={item.category.content}
                    note={item.note}
                    money={item.amount}
                    date={item.dateTransaction}
                />}

        </li>
        )}
    </ul>
};

export default TransactionHistory;