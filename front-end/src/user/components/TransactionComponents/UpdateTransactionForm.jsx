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
    const [categoryValue, setCategoryValue] = useState(props.category);
    const [isRotated, setIsRotated] = useState(0);
    const categoryRef = useRef(null);
    const [currancy, setCurrancy] = useState("VND");
    const [periodValue, setPeriodValue] = useState(props.cycle || "P0D")
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        money: {
            value: props.money < 0 ? props.money * (-1) : props.money,
            isValid: true
        },
        note: {
            value: props.note,
            isValid: true
        },
        start_date: {
            value: new Date(...props.date) || new Date(),
            isValid: true
        },
        end_date: {
            value: new Date(...props.endDate) || new Date(),
            isValid: true
        }
    }, true);

    useEffect(() => {
        console.log(props.category);
    }, [])


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

    async function UpdateTransactionHandler(event) {
        event.preventDefault();
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/transaction", "PUT",
                JSON.stringify({
                    category_id: categoryValue.category.id,
                    transaction_id: formState.inputs.start_date.value,
                    transaction_date: formState.inputs.start_date.value,
                    date_end: formState.inputs.end_date.value,
                    cycle: periodValue,
                    note: formState.inputs.note.value || "",
                    amount: categoryValue.category.income ? formState.inputs.money.value : -parseInt(formState.inputs.money.value, 10)
                }), {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.token
            });
            if (resData.state) {
                props.onClose();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return <div className="update-transaction">
        <div className="update-transaction__header">
            <div className="update-transaction__item">
                <label htmlFor="">Danh mục</label>
                <div className="update-transaction__category-container" ref={categoryRef}  >
                    <div className="update-transaction__category">
                        <div className="update-transaction__category-field">
                            <div style={{ backgroundColor: categoryValue ? categoryValue.category.iconColor : '#24b6b7' }}
                                className="category-field__icon"
                            >
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
                    value={formState.inputs.money.value}
                    initialIsValid={true} />
            </div>
            <div className="update-transaction__item">
                <label htmlFor="">Đơn vị tiền tệ</label>
                <select className="dropdown__currency" value={currancy} onChange={currancyChange}>
                    <option value="VND">VNĐ</option>
                </select>
            </div>
        </div>
        <div className="update-transaction__footer">
            {periodValue!="P0D" && <div className="update-transaction__item">
                <Input id="end_date"
                    text="Ngày kết thúc"
                    element="datepicker"
                    onInput={inputHandler}
                    width="100%"
                    value={formState.inputs.end_date.value}
                    initialIsValid={true} />
            </div>}
            <button
                disabled={isLoading}
                onClick={UpdateTransactionHandler}
                className={`delete-btn ${isLoading && 'isLoading-btn'}`}>
                Xoá giao dịch
            </button>
            <button
                disabled={!formState.isValid || isLoading}
                onClick={UpdateTransactionHandler}
                className={`update-btn ${!formState.isValid && 'disabled-btn'} 
                    ${isLoading && 'isLoading-btn'}`}>
                Cập nhật giao dịch
            </button>
            <button
                disabled={isLoading}
                onClick={UpdateTransactionHandler}
                className={`cancel-btn ${isLoading && 'isLoading-btn'}`}>
                Hủy
            </button>
        </div>
    </div>
};

export default UpdateTransactionForm;