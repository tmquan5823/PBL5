import React from "react"
import "./FilterContainer.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { isValid } from "date-fns";
import Categories from "../../models/Categories";

const FilterContainer = props => {
    const [formState, inputHandler, setFormData] = useForm({
        category: {
            value: "",
            isValid: false
        },
        user: {
            value: "",
            isValid: false
        },
        note: {
            value: "",
            isValid: false
        },
        money: {
            value: "",
            isValid: false
        }
    }, isValid);


    return <React.Fragment >
        <div className="filter-container">
            <div className="filter__header">
                <h4>Bộ lọc</h4>
                <span>Đặt lại bộ lọc</span>
            </div>
            <div className="filter__content">
                <Input id="category"
                    text="Theo danh mục"
                    element="select"
                    type="text"
                    value={formState.inputs.category.value}
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                    options={Categories}
                />
                <Input id="user"
                    text="Theo người"
                    element="select"
                    type="text"
                    value={formState.inputs.user.value}
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                    options={Categories}
                />
                <Input id="note"
                    text="Theo ghi chú"
                    element="input"
                    type="text"
                    value={formState.inputs.note.value}
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                />
                <Input id="money"
                    text="Theo danh số tiền"
                    element="select"
                    type="text"
                    value={formState.inputs.money.value}
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                    options={Categories}
                />
            </div>
        </div>
    </React.Fragment >
};

export default FilterContainer;

