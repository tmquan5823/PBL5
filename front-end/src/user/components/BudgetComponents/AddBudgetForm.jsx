import React from "react";
import "./AddBudgetForm.css";
import Input from "../../../shared/components/FormElements/Input";
import { useForm } from "../../../shared/hooks/form-hook";

const AddBudgetForm = props => {
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
                    <Input id="budget-name"
                        text="Đơn vị tiền tệ"
                        element="input"
                        type="text"
                        onInput={inputHandler}
                        width="45%" />
                </div>
            </div>
            <div className="budget-filter">
                <h3>Lọc</h3>
                <Input id="budget-name"
                    text="Dự trù ngân sách cho "
                    element="input"
                    type="text"
                    onInput={inputHandler}
                    width="45%" />
            </div>
            <div className="budget-period">
                <h3>Kỳ ngân sách</h3>

            </div>
        </div>
        <div className="add-budget__button">
            <button>Tạo ngân sách</button>
        </div>
    </form>
};

export default AddBudgetForm;