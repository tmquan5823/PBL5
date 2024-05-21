import React, { useContext, useEffect, useState } from "react";
import "./UserWalletDetail.css";
import InfoHeader from "../../shared/components/UIElements/InfoHeader";
import Modal from "../../shared/components/UIElements/Modal";
import { DateFormat } from "../../shared/help/DateFormat";
import AddTransactionForm from "../components/TransactionComponents/AddTransactionForm";
import moment from 'moment';
import PageContent from "../../shared/components/UIElements/PageContent";
import FilterContainer from "../components/TransactionComponents/FilterContainer";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { totalAmount } from "../../shared/util/TransactionsCaculator";
import Category from "../components/CategoryComponent/Category";
import { filterData } from "../../shared/util/chartCaculate";

const UserWalletDetail = props => {
    const auth = useContext(AuthContext);
    const [wallet, setWallet] = useState();
    const [expense, setExpense] = useState();
    const [transactions, setTransactions] = useState();
    const [filterTransactions, setFilterTransactions] = useState();
    const [formShow, setFormShow] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/transactions/" + auth.wallet.id, "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setTransactions(resData.list_transaction_present);
                    setFilterTransactions(resData.list_transaction_present);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [auth.token, auth.wallet.id, sendRequest]);

    useEffect(() => {
        setExpense([{ title: 'Số dư Ví hiện tại', money: auth.wallet.moneyLeft },
        { title: 'Tổng thay đổi theo kì', money: totalAmount(filterTransactions, false) + totalAmount(filterTransactions, true) },
        { title: 'Tổng Chi Phí Theo Kì', money: totalAmount(filterTransactions, false) },
        { title: 'Tổng Thu Nhập Theo Kì', money: totalAmount(filterTransactions, true) }]);
    }, [filterTransactions, auth.wallet]);

    function filterChangeHandler(inputs) {
        console.log(inputs.user.value);

        if (inputs.user.value && inputs.user.value.length <= 0) {
            setFilterTransactions([]);
        }
        else {
            setFilterTransactions(filterData(transactions, auth.wallet.id, inputs.category.value, inputs.note.value));
        }
    }

    function closeHandler() {
        setFormShow(false);
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
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
                <div className="calendar-container">
                    <button>&lt;</button>
                    <span>{DateFormat(moment().format('DD/MM/YYYY'))}</span>
                    <button>&gt;</button>
                </div>
            </div>
            <FilterContainer
                onChange={filterChangeHandler} />
            <ExpenseRow expense={expense} />
        </PageContent>
    </React.Fragment>

};

export default UserWalletDetail;