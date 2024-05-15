import "./UpdateTransactionForm.css";
import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import TransactionCategory from "./TransactionCategory";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select } from "antd";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/util/validators";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

const UpdateTransactionForm = props => {
    const auth = useContext(AuthContext);
    const [showCategory, setShowCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState();
    const [isRotated, setIsRotated] = useState(0);
    const categoryRef = useRef(null);
    const [periodValue, setPeriodValue] = useState("0D");
    const [currancy, setCurrancy] = useState("VND");
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        money: {
            value: "",
            isValid: false
        },
        note: {
            value: "",
            isValid: true
        },
        start_date: {
            value: new Date(),
            isValid: true
        },
        end_date: {
            value: new Date(),
            isValid: true
        }
    }, false);

    function periodValueChange(value) {
        setPeriodValue(value);
    }

    const currancyChange = (event) => {
        setCurrancy(event.target.value);
    };

    const handleRotate = () => {
        setIsRotated(!isRotated);
    };

    function ShowCategoryHandler(event) {
        event.preventDefault();
        setShowCategory(!showCategory);
        handleRotate();
    }

    function handlerCategoryChange(value) {
        setCategoryValue(value);
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (categoryRef.current && !categoryRef.current.contains(event.target)) {
            setShowCategory(false);
        }
    };

    function UpdateTransactionHandler(event) {
        event.preventDefault();
     }

    return <div className="update-transaction">
        <div className="update-transaction__header">
            <div className="update-transaction__item">
                <label htmlFor="">Danh mục</label>
                <div className="update-transaction__category-container" ref={categoryRef}  >
                    <div className="update-transaction__category">
                        <div className="update-transaction__category-field">
                            <div style={{ backgroundColor: categoryValue ? categoryValue.category.iconColor : '#24b6b7' }} className="category-field__icon">
                                <img src={`${categoryValue ? categoryValue.category.iconUrl : '/images/plus.png'}`} alt="" />
                            </div>
                            <span>{categoryValue ? categoryValue.category.content : 'Chọn danh mục'}</span>
                        </div>
                        <button onClick={ShowCategoryHandler}><img className={`up-down-img ${showCategory && 'category-active'} ${isRotated ? 'rotateAnimation' : ''}`} src="/images/upload.png" alt="" /></button>
                    </div>
                    {showCategory && <TransactionCategory
                        categories={props.categories}
                        value={categoryValue}
                        onCategoryChange={handlerCategoryChange}
                    />}
                </div>
            </div>
            <div className="update-transaction__item">
                <Input id="start_date"
                    text="Ngày bắt đầu"
                    element="datepicker"
                    onInput={inputHandler}
                    width="100%"
                    value={formState.inputs.start_date.value}
                    initialIsValid={true} />
            </div>
            <div className="update-transaction__item">
                <Input id="note"
                    text="Ghi chú"
                    element="input"
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    width="90%"
                    value={formState.inputs.note.value}
                    initialIsValid={true} />
            </div>
            <div className="update-transaction__item">
                <Input id="money"
                    text="Số tiền"
                    element="input"
                    type="text"
                    numberOnly
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    width="90%"
                    value={formState.inputs.note.value}
                    initialIsValid={true} />
            </div>
            <div className="update-transaction__item">
                <label htmlFor="">Đơn vị tiền tệ</label>
                <select className="dropdown__currency" value={currancy} onChange={currancyChange}>
                    <option value="VND">VNĐ</option>
                </select>
            </div>
        </div>
        <div className="add-transaction__footer">
            {periodValue !== "0D" && <div className="add-transaction__item">
                <Input id="end_date"
                    text="Ngày kết thúc"
                    element="datepicker"
                    onInput={inputHandler}
                    width="100%"
                    value={formState.inputs.end_date.value}
                    initialIsValid={true} />
            </div>}
            <button
                disabled={!formState.isValid || isLoading}
                onClick={UpdateTransactionHandler}
                className={`add-btn ${!formState.isValid && 'disabled-btn'} 
                    ${isLoading && 'isLoading-btn'}`}>
                Thêm giao dịch
            </button>
        </div>
    </div>
};

export default UpdateTransactionForm;