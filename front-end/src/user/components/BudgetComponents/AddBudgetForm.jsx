import React, { useState, useEffect } from "react";
import "./AddBudgetForm.css";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import BudgetCurrency from "./BudgetCurrency";
import BudgetPeriodList from "./BudgetPeriodList";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";
import { addDays, addWeeks, addMonths } from 'date-fns';

const AddBudgetForm = props => {
    const [selectedOption, setSelectedOption] = useState('VND');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedPeriodOption, setSelectedPeriodOption] = useState('');
    const [dateState, setDateState] = useState(true);
    const [budgetFormState, setBudgetFormState] = useState(false);


    const [formState, inputHandler] = useForm({
        budgetname: {
            value: "",
            isValid: false
        },
        budget: {
            value: "",
            isValid: false
        }
    }, false);

    useEffect(() => {
        console.log(selectedPeriodOption);
        switch (selectedPeriodOption) {
            case 'once':
                setEndDate(new Date());
                break;
            case 'everyday':
                setEndDate(addDays(startDate, 1));
                break;
            case 'everyweek':
                setEndDate(addWeeks(startDate, 1));
                break;
            case 'everymonth':
                setEndDate(addMonths(startDate, 1));
                break;
            default: break;
        }
    }, [selectedPeriodOption]);

    useEffect(() => {
        const isEndDateValid = startDate <= endDate;
        setDateState(isEndDateValid);

        setBudgetFormState(formState.isValid && isEndDateValid && !!selectedPeriodOption);
    }, [startDate, endDate, formState, selectedPeriodOption]);

    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };


    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOptionChange = (value) => {
        setSelectedPeriodOption(value);
    };

    return <form action="" className="add-budget-form">
        <h2>Thêm ngân sách mới</h2>
        <div className="budget-form__content">
            <div className="general-info">
                <h3>Thông tin chung</h3>
                <Input id="budgetname"
                    text="Tên ngân sách"
                    element="input"
                    type="text"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    width="45%" />
                <div className="form-row">
                    <Input id="budget"
                        text="Ngân sách"
                        element="input"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        width="45%" />
                    <BudgetCurrency value={selectedOption} onChange={handleDropdownChange} />
                </div>
            </div>
            <div className="budget-period">
                <h3>Kỳ ngân sách</h3>
                <BudgetPeriodList value={selectedPeriodOption} onChange={handleOptionChange} />
                <div className="budget-period__date">
                    <div className="date-container">
                        <label htmlFor="">Ngày bắt đầu</label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    {(selectedPeriodOption === "once") && (<div className="date-container">
                        <label htmlFor="">Ngày kết thúc</label>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            dateFormat="dd/MM/yyyy"
                        />
                        {!dateState && <label className="date-invalid">Ngày kết thúc phải lớn hơn ngày bắt đầu!</label>}
                    </div>)}
                </div>
            </div>
        </div>
        <div className={`add-budget__button ${!budgetFormState && 'budget-state--isvalid'}`}>
            <button>Tạo ngân sách</button>
        </div>
    </form>
};

export default AddBudgetForm;