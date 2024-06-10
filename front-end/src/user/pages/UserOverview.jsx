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
import { dataAreaChart, dataBarChart, dataDoughnutChart, filterData, filterWallet } from "../../shared/util/chartCaculate";
import { totalAmount } from "../../shared/util/TransactionsCaculator";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PieChart from "../components/ChartComponent/PieChart";
import BarChart from "../components/ChartComponent/BarChart";
import AreaChart from "../components/ChartComponent/AreaChart";
import DatePickerComponent from "../../shared/components/FormElements/DatePickerComponent";


const UserOverview = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [wallets, setWallets] = useState();
    const [filterWallets, setFilterWallets] = useState();
    const [expense, setExpense] = useState();
    const [newWallet, setNewWallet] = useState();
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filterTransactions, setFilterTransactions] = useState([]);
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    const [date, setDate] = useState({
        startDate: startOfMonth,
        endDate: endOfMonth
    });

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
        setFilterTransactions(filterData(transactions, inputs.wallet.value, inputs.category.value, inputs.note.value, date.startDate, date.endDate));
        setFilterWallets(filterWallet(wallets, inputs.wallet.value));
    }, [filterData, transactions, wallets, date]);

    function dateChangeHandler(startDate, endDate) {
        if (startDate && endDate) {
            setDate({
                startDate: startDate,
                endDate: endDate
            })
        }
    }

    function addNewWalletHandler(wallet) {
        setNewWallet(wallet)
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <PageContent title='Tổng quan' >
            <WalletContainer
                onAddWallet={addNewWalletHandler}
                wallets={wallets} />
            <div className="overview-content">
                <h2>Tổng quan</h2>
                <div className="overview-content__header">
                    <DatePickerComponent
                        onChange={dateChangeHandler}
                    />
                </div>
                <FilterContainer
                    newWallet={newWallet}
                    startDate={date.startDate}
                    endDate={date.endDate}
                    onChange={filterChangeHandler}
                />
                <ExpenseRow expense={expense} />
            </div>
            <div className="charts-container">
                {filterTransactions.length > 0 && <div className="chart-item">
                    <BarChart
                        title="Giao dịch theo kì"
                        data={dataBarChart(filterTransactions)}
                    />
                </div>}
                {/* {filterTransactions.length > 0 && filterWallets.length > 0 && <div className="chart-item">
                    <AreaChart
                        title="Thu chi theo kì"
                        data={dataAreaChart(filterTransactions, filterWallets)}
                    />
                </div>} */}
                {filterTransactions.filter(item => item.amount > 0).length > 0 && <div className="chart-item doughnut-chart">
                    <PieChart
                        title="Thu nhập theo kì"
                        data={dataDoughnutChart(categories.filter(item => item.category.income), filterTransactions.filter(item => item.amount > 0))}
                    />
                </div>}
                {filterTransactions.filter(item => item.amount < 0).length > 0 && <div className="chart-item  doughnut-chart">
                    <PieChart
                        title="Chi phí theo kì"
                        data={dataDoughnutChart(categories.filter(item => !item.category.income), filterTransactions.filter(item => item.amount < 0))}
                    />
                </div>}
            </div>
        </PageContent>
    </React.Fragment>

};

export default UserOverview;