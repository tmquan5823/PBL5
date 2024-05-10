import React, { useState } from "react";
import "./UserWalletDetail.css";
import InfoHeader from "../../shared/components/UIElements/InfoHeader";
import Modal from "../../shared/components/UIElements/Modal";
import DateFormat from "../../shared/help/DateFormat";
import AddTransactionForm from "../components/TransactionComponents/AddTransactionForm";
import moment from 'moment';
import PageContent from "../../shared/components/UIElements/PageContent";
import FilterContainer from "../components/TransactionComponents/FilterContainer";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";

const UserWalletDetail = props => {
    const [formShow, setFormShow] = useState(false);

    const expense = [{ title: 'Tổng số dư', money: 1000000 },
    { title: 'Tổng thay đổi theo kì', money: -1000000 },
    { title: 'Tổng Chi Phí Theo Kì', money: 0 },
    { title: 'Tổng Thu Nhập Theo Kì', money: 0 }];

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
        <PageContent title="Tổng quan ví">
            <div className="wallet-detail__header">
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
            <ExpenseRow expense={expense} />
        </PageContent>
    </React.Fragment>

};

export default UserWalletDetail;