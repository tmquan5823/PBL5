import React, { useState, useEffect, useContext } from "react";
import "./UpdateBudgetForm.css";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import BudgetCurrency from "./BudgetCurrency";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner"
import { budgetDateFormat } from "../../../shared/help/DateFormat";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UpdateBudgetForm = props => {
    const auth = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('VND');
    const [startDate, setStartDate] = useState(new Date(props.start) || new Date);
    const [endDate, setEndDate] = useState(new Date(props.end) || new Date);
    const [dateState, setDateState] = useState(true);
    const [budgetFormState, setBudgetFormState] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();

    const [formState, inputHandler] = useForm({
        budgetName: {
            value: props.name,
            isValid: true
        },
        budget: {
            value: props.money,
            isValid: true
        }
    }, true);



    async function updateBudgetHandler(event) {
        event.preventDefault();
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/budget", "PUT",
                JSON.stringify({
                    budget_id: props.id,
                    budget_name: formState.inputs.budgetName.value,
                    budget_money: formState.inputs.budget.value,
                    date_start: startDate,
                    date_end: endDate
                }), {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.token
            });
            if (resData.state) {
                props.onClose();
                props.onUpdate(resData);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteHandler(event) {
        event.preventDefault();
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/budget/"+props.id, "DELETE",
                null, {
                'Authorization': "Bearer " + auth.token
            });
            if (resData.state) {
                props.onClose();
                history.push("/user/budget");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const isEndDateValid = startDate.getDate() <= endDate.getDate();
        setDateState(isEndDateValid);
        setBudgetFormState(formState.isValid && isEndDateValid);
    }, [startDate, endDate, formState]);

    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <form action="" className="update-budget-form">
            <h2>Chỉnh sửa ngân sách</h2>
            <div className="budget-form__content">
                <div className="general-info">
                    <h3>Thông tin chung</h3>
                    <Input id="budgetName"
                        text="Tên ngân sách"
                        element="input"
                        type="text"
                        value={formState.inputs.budgetName.value}
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        width="45%" />
                    <div className="form-row">
                        <Input id="budget"
                            text="Ngân sách"
                            element="input"
                            numberOnly
                            value={formState.inputs.budget.value}
                            type="text"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                            width="45%" />
                        <BudgetCurrency value={selectedOption} onChange={handleDropdownChange} />
                    </div>
                </div>
                <div className="budget-period">
                    <h3>Kỳ ngân sách</h3>
                    <div className="budget-period__date">
                        <div className="date-container">
                            <label htmlFor="">Ngày bắt đầu</label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className="date-container">
                            <label htmlFor="">Ngày kết thúc</label>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="dd/MM/yyyy"
                            />
                            {!dateState && <label className="date-invalid">Ngày kết thúc phải lớn hơn ngày bắt đầu!</label>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`update-budget__button ${!budgetFormState && 'budget-state--isvalid'}`}>
                <button disabled={!budgetFormState} onClick={updateBudgetHandler}>Cập nhật ngân sách</button>
            </div>
            <div className="cancel-update__button">
                <button onClick={event => {
                    event.preventDefault();
                    props.onClose();
                }}>
                    Hủy
                </button>
            </div>
            <div className="delete-budget">
                <a onClick={deleteHandler} href="#">Xoá ngân sách</a>
            </div>
        </form>
    </React.Fragment>
};

export default UpdateBudgetForm;