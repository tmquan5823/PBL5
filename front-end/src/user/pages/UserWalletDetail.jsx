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

const UserWalletDetail = props => {
    const auth = useContext(AuthContext);
    const [wallet, setWallet] = useState();
    const [transactions, setTransactions] = useState();
    const [formShow, setFormShow] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const expense = [{ title: 'Tổng số dư', money: wallet ? wallet.money_left : 0 },
    { title: 'Tổng thay đổi theo kì', money: transactions ? totalAmount(transactions, true) + totalAmount(transactions, false) : 0 },
    { title: 'Tổng Chi Phí Theo Kì', money: transactions ? totalAmount(transactions, false) : 0 },
    { title: 'Tổng Thu Nhập Theo Kì', money: transactions ? totalAmount(transactions, true) : 0 }];

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/wallet/" + auth.wallet.id, "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setWallet(resData);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [auth.token, auth.wallet.id, sendRequest]);

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/transactions/" + auth.wallet.id, "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setTransactions(resData.list_transaction_present);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [auth.token, auth.wallet.id, sendRequest]);


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
            <FilterContainer />
            <ExpenseRow expense={expense} />
        </PageContent>
    </React.Fragment>

};

export default UserWalletDetail;