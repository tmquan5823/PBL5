import React, { useState } from "react";
import "./UserTransaction.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";
import DateFormat from "../../shared/help/DateFormat";
import moment from 'moment';
import Modal from "../../shared/components/UIElements/Modal";
import AddTransactionForm from "../components/TransactionComponents/AddTransactionForm";
import FilterContainer from "../components/TransactionComponents/FilterContainer";

const UserTransaction = props => {
    const [formShow, setFormShow] = useState(false);

    function closeHandler() {
        setFormShow(false);
    }

    function createButtonHandler() {
        setFormShow(true);
    }

    return <React.Fragment>
        <Modal
            top="17vh"
            width="80%"
            show={formShow}
            onCancel={closeHandler}
            content={<AddTransactionForm />}
        >
        </Modal>
        <PageContent title='Giao dịch' >
            <div className="transaction-header">
                <button onClick={createButtonHandler} className="add-transaction__btn">
                    Thêm giao dịch
                </button>
                <div className="calendar-container">
                    <button>&lt;</button>
                    <span>{DateFormat(moment().format('DD/MM/YYYY'))}</span>
                    <button>&gt;</button>
                </div>
            </div>
            <FilterContainer />
            <ExpenseRow />
            <div className="transaction-history">

            </div>
        </PageContent>
    </React.Fragment>

};

export default UserTransaction;