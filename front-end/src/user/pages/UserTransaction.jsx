import React, { useState, useEffect, useContext, useCallback } from "react";
import "./UserTransaction.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";
import { DateFormat } from "../../shared/help/DateFormat";
import moment from 'moment';
import Modal from "../../shared/components/UIElements/Modal";
import AddTransactionForm from "../components/TransactionComponents/AddTransactionForm";
import FilterContainer from "../components/TransactionComponents/FilterContainer";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import TransactionHistory from "../components/TransactionComponents/TransactionHistory";
import { totalAmount } from "../../shared/util/TransactionsCaculator";
import { formatArrayDate } from "../../shared/help/DateFormat";

const UserTransaction = props => {
    const [formShow, setFormShow] = useState(false);
    const [categories, setCategories] = useState({});
    const [transactions, setTransactions] = useState();
    const [futureTransactions, setFutureTransactions] = useState();
    const [transactionsInDate, setTransactionsInDate] = useState();
    const [expense, setExpense] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    function closeHandler() {
        setFormShow(false);
    }

    function createButtonHandler() {
        setFormShow(true);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/categories", "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setCategories({
                        incomes: resData.list_categories.filter(item => item.category.income),
                        outcomes: resData.list_categories.filter(item => !item.category.income),
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/transactions/" + auth.wallet.id, "GET", null, {
                'Authorization': "Bearer " + auth.token
            });
            if (resData.state) {
                setTransactions(resData.list_transaction_present);
                setFutureTransactions(resData.list_transaction_future);
                console.log(resData);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setExpense([{ title: 'Số dư Ví hiện tại', money: auth.wallet.moneyLeft },
        { title: 'Tổng thay đổi theo kì', money: totalAmount(transactions, false) + totalAmount(transactions, true) },
        { title: 'Tổng Chi Phí Theo Kì', money: totalAmount(transactions, false) },
        { title: 'Tổng Thu Nhập Theo Kì', money: totalAmount(transactions, true) }]);

        if (transactions && transactions.length > 0) {
            let transactionArray = [];
            let array = [];
            let check = transactions[0].dateTransaction.slice(0, 3);
            for (let i = 0; i < transactions.length; i++) {
                const date = transactions[i].dateTransaction.slice(0, 3);
                if (date.toString() == check.toString()) {
                    array.push(transactions[i]);
                }
                else {
                    transactionArray.push(array);
                    check = date;
                    array = [transactions[i]];
                }
            }
            setTransactionsInDate(transactionArray);
        }
    }, [transactions, auth.wallet]);

    const onUpdateTransaction = useCallback((item) => {
        fetchData();
    }, [fetchData]);

    const onDeleteHandler = useCallback((item) => {
        fetchData();
    }, [fetchData]);

    const AddTransactionHandler = useCallback((item) => {
        fetchData();
    }, [fetchData]);

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <Modal
            top="17vh"
            width="80%"
            show={formShow}
            onCancel={closeHandler}
            content={<AddTransactionForm
                categories={categories}
                onClose={closeHandler}
                onAdd={AddTransactionHandler}
            />}
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
            <FilterContainer

            />
            <ExpenseRow expense={expense} />
            {(futureTransactions && futureTransactions.length > 0) && <TransactionHistory
                title="Giao dịch dự kiến"
                showDate
                transactions={futureTransactions}
                categories={categories}
                onUpdate={onUpdateTransaction}
                onDelete={onDeleteHandler}
            />}
            <br />
            {transactionsInDate && transactionsInDate.map(items => <TransactionHistory
                key={items[0].dateTransaction.slice(0, 3).toString()}
                title={formatArrayDate(items[0].dateTransaction.slice(0, 3))}
                transactions={items}
                categories={categories}
                onUpdate={onUpdateTransaction}
                onDelete={onDeleteHandler}
            />)}
        </PageContent>
    </React.Fragment>

};

export default UserTransaction;