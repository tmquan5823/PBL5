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
import { filterData } from "../../shared/util/chartCaculate";
import DateRangePickerComp from "../../shared/components/FormElements/DateRangePickerComp";
import DatePickerComponent from "../../shared/components/FormElements/DatePickerComponent";

const UserTransaction = props => {
    const [formShow, setFormShow] = useState(false);
    const [categories, setCategories] = useState({});
    const [transactions, setTransactions] = useState();
    const [filterTransactions, setFilterTransactions] = useState();
    const [futureTransactions, setFutureTransactions] = useState();
    const [transactionsInDate, setTransactionsInDate] = useState();
    const [expense, setExpense] = useState();
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    const [date, setDate] = useState({
        startDate: startOfMonth,
        endDate: endOfMonth
    });
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
        if (auth.wallet) {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/transactions/" + auth.wallet.id, "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setTransactions(resData.list_transaction_present);
                    setFilterTransactions(resData.list_transaction_present);
                    setFutureTransactions(resData.list_transaction_future);
                    console.log(resData);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [auth.wallet]);

    useEffect(() => {
        if (auth.wallet) {
            setExpense([{ title: 'Số dư Ví hiện tại', money: auth.wallet.moneyLeft },
            { title: 'Tổng thay đổi theo kì', money: totalAmount(filterTransactions, false) + totalAmount(filterTransactions, true) },
            { title: 'Tổng Chi Phí Theo Kì', money: totalAmount(filterTransactions, false) },
            { title: 'Tổng Thu Nhập Theo Kì', money: totalAmount(filterTransactions, true) }]);
        }

        if (filterTransactions && filterTransactions.length > 0) {
            let transactionArray = [];
            let array = [];
            let check = filterTransactions[0].dateTransaction.slice(0, 3);
            for (let i = 0; i < filterTransactions.length; i++) {
                const date = filterTransactions[i].dateTransaction.slice(0, 3);
                if (date.toString() == check.toString()) {
                    array.push(filterTransactions[i]);
                }
                else {
                    transactionArray.push(array);
                    check = date;
                    array = [filterTransactions[i]];
                }
            }
            transactionArray.push(array);
            setTransactionsInDate(transactionArray);
        } else {
            setTransactionsInDate([]);
        }
    }, [filterTransactions, auth.wallet]);

    const onUpdateTransaction = useCallback((item) => {
        fetchData();
    }, [fetchData]);

    const onDeleteHandler = useCallback((item) => {
        fetchData();
    }, [fetchData]);

    const AddTransactionHandler = useCallback((item) => {
        fetchData();
    }, [fetchData]);

    const filterChangeHandler = (inputs) => {
        if (!auth.wallet || (inputs.user.value && inputs.user.value.length <= 0)) {
            setFilterTransactions([]);
        }
        else {
            setFilterTransactions(filterData(transactions, auth.wallet.id, inputs.category.value, inputs.note.value, date.startDate, date.endDate));
        }
    };

    function dateChangeHandler(startDate, endDate) {
        if (startDate && endDate) {
            setDate({
                startDate: startDate,
                endDate: endDate
            })
        }
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
            {auth.wallet ? <React.Fragment>
                <div className="transaction-header">
                    <button onClick={createButtonHandler} className="add-transaction__btn">
                        Thêm giao dịch
                    </button>
                    <DatePickerComponent
                        onChange={dateChangeHandler}
                    />
                </div>
                <FilterContainer
                    startDate={date.startDate}
                    endDate={date.endDate}
                    onChange={filterChangeHandler}
                />
                <ExpenseRow expense={expense} />
                {(futureTransactions && futureTransactions.length > 0) && <TransactionHistory
                    title="Giao dịch dự kiến"
                    showDate
                    updateStartDate={false}
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
                    updateStartDate={true}
                    categories={categories}
                    onUpdate={onUpdateTransaction}
                    onDelete={onDeleteHandler}
                />)}
            </React.Fragment> :
                <div className="undefined-budget">
                    <img src="/images/warning.png" alt="" />
                    <span>Ngân sách không tồn tại hoặc đã bị xóa!</span>
                </div>}
        </PageContent>
    </React.Fragment>

};

export default UserTransaction;