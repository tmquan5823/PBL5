import React, { useCallback, useContext, useEffect, useState } from "react";
import "./UserOverview.css";
import InfoHeader from "../../shared/components/UIElements/InfoHeader";
import Wallet from "../components/OverviewComponents/Wallet";
import PageContent from "../../shared/components/UIElements/PageContent";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";
import WalletContainer from "../components/OverviewComponents/WalletContainer";
import FilterContainer from "../components/OverviewComponents/FilterContainer";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { filterData, filterWallet } from "../../shared/util/chartCaculate";
import { totalAmount } from "../../shared/util/TransactionsCaculator";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import AreaChart from "../components/ChartComponent/AreaChart";
import PieChart from "../components/ChartComponent/PieChart";


const UserOverview = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [wallets, setWallets] = useState();
    const [filterWallets, setFilterWallets] = useState();
    const [expense, setExpense] = useState();
    const [categories, setCategories] = useState();
    const [transactions, setTransactions] = useState();
    const [filterTransactions, setFilterTransactions] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/transactions", "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setWallets(resData.list_wallets);
                    setFilterWallets(resData.list_wallets);
                    setTransactions(resData.list_transactions);
                    setFilterTransactions(resData.list_transactions);
                    setCategories(resData.list_categories);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setExpense([{
            title: 'Tổng Số dư', money: filterWallets ? filterWallets.reduce((accumulator, item) => {
                return accumulator + item.moneyLeft;
            }, 0) : 0
        },
        { title: 'Tổng Thay Đổi Theo Kì', money: totalAmount(filterTransactions, false) + totalAmount(filterTransactions, true) },
        { title: 'Tổng Chi Phí Theo Kì', money: totalAmount(filterTransactions, false) },
        { title: 'Tổng Thu Nhập Theo Kì', money: totalAmount(filterTransactions, true) }]);
    }, [filterTransactions, filterWallets]);

    const filterChangeHandler = useCallback((inputs) => {
        console.log(inputs);
        setFilterTransactions(filterData(transactions, inputs.wallet.value, inputs.category.value, inputs.note.value));
        setFilterWallets(filterWallet(wallets, inputs.wallet.value));
    }, [filterData, transactions, wallets]);

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <PageContent title='Tổng quan' >
            <WalletContainer wallets={wallets} />
            <div className="overview-content">
                <h2>Tổng quan</h2>
                <FilterContainer
                    onChange={filterChangeHandler}
                />
                <ExpenseRow expense={expense} />
            </div>
            <div className="chart-container">
                <PieChart
                    data={categories}
                />
            </div>
        </PageContent>
    </React.Fragment>

};

export default UserOverview;