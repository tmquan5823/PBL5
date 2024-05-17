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

const UserBudgetDetail = props => {
    const auth = useContext(AuthContext);
    const budgetID = useParams().budgetID;
    const [showForm, setShowForm] = useState();
    const [budget, setBudget] = useState();
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
    }, []);

    useEffect(() => {
        if (budget) {
            setExpense([{ title: 'Ngân sách ban đầu', money: budget.money },
            { title: 'Số tiền đã chi', money: budget.spend },
            { title: 'Ngân sách còn lại', money: budget.money + budget.spend },
            { title: 'Số tiền có thể dùng', money: (budget.money + budget.spend) / 30, no_mark: true, perDay: true }]);
        }
    }, [budget]);

    function closeHandler() {
        setShowForm(false);
    }

    function showFormHandler(event) {
        event.preventDefault();
        setShowForm(true);
    }

    return <PageContent title="Ngân sách">
        <Modal
            show={showForm}
            onCancel={closeHandler}
        >
            <UpdateBudgetForm
                onAdd={props.onAdd}
                onClose={closeHandler} />
        </Modal>
        {budget && <React.Fragment>
            <div className="calendar-container">
                <button>&lt;</button>
                <span>{new Date(budget.dateStart)} - {new Date(budget.dateEnd)}</span>
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
                    <h3>Tiếp tục chi tiêu. Bạn có thể chi tiêu {((budget.money + budget.spend) / 30).toLocaleString('vi-VN')} VNĐ mỗi ngày cho phần còn lại của thời kỳ.</h3>
                    <div className="progress-bar__container">
                        <ProgressBar percent={(budget.money + budget.spend) / budget.money * 100} />
                        <div className="progress-bar__time">
                            <p>{DateFormat(budget.dateStart)}</p>
                            <p>{DateFormat(budget.dateEnd)}</p>
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>}
    </PageContent>
};

export default UserBudgetDetail;