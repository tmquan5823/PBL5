import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./UserBudgetDetail.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import Budgets from "../models/Budgets";
import { DateFormat } from "../../shared/help/DateFormat";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";
import ProgressBar from "../../shared/components/UIElements/ProgressBar";
import Modal from "../../shared/components/UIElements/Modal";
import UpdateBudgetForm from "../components/BudgetComponents/UpdateBudgetForm";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { formatArrayDate2 } from "../../shared/help/DateFormat";
import { dateCaculate } from "../../shared/util/DateCaculator";
import PieChart from "../components/ChartComponent/PieChart";
import { dataDoughnutChart } from "../../shared/util/chartCaculate";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserBudgetDetail = props => {
    const auth = useContext(AuthContext);
    const budgetID = useParams().budgetID;
    const [showForm, setShowForm] = useState();
    const [budget, setBudget] = useState();
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [expense, setExpense] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/budget/" + budgetID, "GET",
                    null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setBudget(resData);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [budgetID]);

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/budget/transaction/" + budgetID, "GET",
                    null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setCategories(resData.list_categories)
                    setTransactions(resData.list_transactions)
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (budget) {
            setExpense([{ title: 'Ngân sách ban đầu', money: budget.money },
            { title: 'Số tiền đã chi', money: budget.spend },
            { title: 'Ngân sách còn lại', money: budget.money + budget.spend },
            { title: 'Số tiền có thể dùng', money: (budget.money + budget.spend > 0) ? (budget.money + budget.spend) / dateCaculate(new Date, budget.dateEnd) : '0', no_mark: true, perDay: true }]);
        }
        console.log(dataDoughnutChart(categories.filter(item => item.category.income), transactions.filter(item => item.amount >= 0)))
    }, [budget]);

    function closeHandler() {
        setShowForm(false);
    }

    function showFormHandler(event) {
        event.preventDefault();
        setShowForm(true);
    }

    function updateHandler(item) {
        if (item) {
            setBudget(item);
        }
    }

    return <PageContent title="Ngân sách">
        {isLoading && <LoadingSpinner asOverlay />}
        <Modal
            show={showForm}
            onCancel={closeHandler}
        >
            {budget && <UpdateBudgetForm
                id={budgetID}
                name={budget.name}
                money={budget.money}
                start={formatArrayDate2(budget.dateStart)}
                end={formatArrayDate2(budget.dateEnd)}
                onUpdate={updateHandler}
                onClose={closeHandler} />}
        </Modal>
        {budget ? <React.Fragment>
            <div className="calendar-container">
                <button>&lt;</button>
                <span>{formatArrayDate2(budget.dateStart)} - {formatArrayDate2(budget.dateEnd)}</span>
                <button>&gt;</button>
            </div>
            <div className="budget-detail__header">
                <div className="budget-detail__header-link">
                    <Link to="/user/budget"><h3 className="budget-detail__title">Ngân sách</h3></Link>
                    <span>&gt;</span>
                    <div className="budget-detail__info">
                        <h3>{budget.name}</h3>
                        <h4>Tất cả các ví</h4>
                    </div>
                </div>
                <button onClick={showFormHandler} className="budget-detail__update-btn">
                    Chỉnh sửa ngân sách
                </button>
            </div>
            <ExpenseRow expense={expense} />
            <div className="budget-detail__progress">
                <h3 className="budget-detail__progress-title">Tiến độ ngân sách</h3>
                <div className="budget-detail__progress-content">
                    <h3>Tiếp tục chi tiêu. Bạn có thể chi tiêu {(expense && expense[3].money > 0) ? expense[3].money.toLocaleString('vi-VN') : '0'} VNĐ mỗi ngày cho phần còn lại của thời kỳ.</h3>
                    <div className="progress-bar__container">
                        <ProgressBar percent={(-1 * budget.spend) / budget.money * 100} />
                        <div className="progress-bar__time">
                            <p>{formatArrayDate2(budget.dateStart)}</p>
                            <p>{formatArrayDate2(budget.dateEnd)}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="budget__piechart">
                {categories.length > 0 && transactions.length > 0 && <PieChart
                    title="Chi phí theo kì"
                    data={dataDoughnutChart(categories.filter(item => !item.category.income), transactions.filter(item => item.amount < 0))}
                />}
            </div>
        </React.Fragment> :
            <div className="undefined-budget">
                <img src="/images/warning.png" alt="" />
                <span>Ngân sách không tồn tại hoặc đã bị xóa!</span>
            </div>
        }
    </PageContent>
};

export default UserBudgetDetail;