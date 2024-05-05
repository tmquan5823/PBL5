import React, { useState } from "react";
import "./AddBudgetForm.css";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import BudgetCurrency from "./BudgetCurrency";
import BudgetPeriodList from "./BudgetPeriodList";

const AddBudgetForm = props => {
    const [selectedOption, setSelectedOption] = useState('');

    const [selectedPeriodOption, setSelectedPeriodOption] = useState('');


    const [formState, inputHandler] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false);

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedPeriodOption(event.target.value);
    };

    return <form action="" className="add-budget-form">
        <h2>Thêm ngân sách mới</h2>
        <div className="budget-form__content">
            <div className="general-info">
                <h3>Thông tin chung</h3>
                <Input id="budget-name"
                    text="Tên ngân sách"
                    element="input"
                    type="text"
                    onInput={inputHandler}
                    width="45%" />
                <div className="form-row">
                    <Input id="budget-name"
                        text="Ngân sách"
                        element="input"
                        type="text"
                        onInput={inputHandler}
                        width="45%" />
                    <BudgetCurrency value={selectedOption} onChange={handleDropdownChange} />
                </div>
            </div>
            <div className="budget-period">
                <h3>Kỳ ngân sách</h3>
                <BudgetPeriodList value={selectedPeriodOption} onChange={handleOptionChange} />
            </div>
        </div>
        <div className="add-budget__button">
            <button>Tạo ngân sách</button>

        </div>
    </form>
};

export default AddBudgetForm;