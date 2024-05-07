import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./UserBudgetDetail.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import Budgets from "../models/Budgets";
import DateFormat from "../../shared/help/DateFormat";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";
import ProgressBar from "../../shared/components/UIElements/ProgressBar";

const UserBudgetDetail = props => {
    const budgetID = useParams().budgetID;
    const budget = Budgets.find((item) => item.id == budgetID);
    const expense = [{ title: 'Ngân sách ban đầu', money: budget.money },
    { title: 'Số tiền đã chi', money: budget.moneyLeft - budget.money },
    { title: 'Ngân sách còn lại', money: budget.moneyLeft },
    { title: 'Số tiền có thể dùng', money: budget.moneyLeft / 30, no_mark: true, perDay: true }];

    return <PageContent title="Ngân sách">
        <div className="calendar-container">
            <button>&lt;</button>
            <span>{DateFormat(budget.start)} - {DateFormat(budget.end)}</span>
            <button>&gt;</button>
        </div>
        <div className="budget-detail__header">
            <div className="budget-detail__header-link">
                <Link to="/user/budget"><h3 className="budget-detail__title">Ngân sách</h3></Link>
                <span>&gt;</span>
                <div className="budget-detail__info">
                    <h3>{budget.title}</h3>
                    <h4>{budget.wallet}</h4>
                </div>
            </div>
            <button className="budget-detail__update-btn">
                Chỉnh sửa ngân sách
            </button>
        </div>
        <ExpenseRow expense={expense} />
        <div className="budget-detail__progress">
            <h3 className="budget-detail__progress-title">Tiến độ ngân sách</h3>
            <div className="budget-detail__progress-content">
                <h3>Tiếp tục chi tiêu. Bạn có thể chi tiêu {(budget.moneyLeft / 30).toLocaleString('vi-VN')} VNĐ mỗi ngày cho phần còn lại của thời kỳ.</h3>
                <div className="progress-bar__container">
                    <ProgressBar percent={budget.moneyLeft / budget.money * 100} />
                    <div className="progress-bar__time">
                        <p>{DateFormat(budget.start)}</p>
                        <p>{DateFormat(budget.end)}</p>
                    </div>
                </div>

            </div>
        </div>
    </PageContent>
};

export default UserBudgetDetail;