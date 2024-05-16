import React, { useState, useEffect, useContext } from "react";
import "./UserTransaction.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";
import {DateFormat} from "../../shared/help/DateFormat";
import moment from 'moment';
import Modal from "../../shared/components/UIElements/Modal";
import AddTransactionForm from "../components/TransactionComponents/AddTransactionForm";
import FilterContainer from "../components/TransactionComponents/FilterContainer";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import TransactionHistory from "../components/TransactionComponents/TransactionHistory";

const UserTransaction = props => {
    const [formShow, setFormShow] = useState(false);
    const [categories, setCategories] = useState({});
    const [transactions, setTransactions] = useState();
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
                    console.log(categories);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/transactions/" + auth.wallet.id, "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setTransactions(resData.list_transaction_present);
                    console.log(resData);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    function onUpdateTransaction(item) {
        setTransactions(preVal => preVal.map(transaction =>
            transaction.id === item.id ? item : transaction
        ));
    }

    function onDeleteHandler(id) {
        setTransactions(preVal => preVal.filter(item => item.id !== id));
    }

    function AddTransactionHandler(items) {
        setTransactions(preVal => [...items, ...preVal]);
    }

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
            <FilterContainer />
            <ExpenseRow />
            <TransactionHistory
                transactions={transactions}
                categories={categories}
                onUpdate={onUpdateTransaction}
                onDelete={onDeleteHandler}
            />
        </PageContent>
    </React.Fragment>

};

export default UserTransaction;