import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import "./AddTransactionForm.css";
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

const AddTransactionForm = props => {
    const auth = useContext(AuthContext);
    const [showCategory, setShowCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState();
    const [isRotated, setIsRotated] = useState(0);
    const categoryRef = useRef(null);
    const [periodValue, setPeriodValue] = useState("P0D");
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

    async function addTransactionHandler(event) {
        event.preventDefault();
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/transaction", "POST",
                JSON.stringify({
                    wallet_id: auth.wallet.id,
                    category_id: categoryValue.category.id,
                    transaction_date: formState.inputs.start_date.value,
                    date_end: periodValue === 'P0D' ? null : formState.inputs.end_date.value,
                    cycle: periodValue === 'P0D' ? null : periodValue,
                    note: formState.inputs.note.value || "",
                    amount: categoryValue.category.income ? parseInt(formState.inputs.money.value) : -parseInt(formState.inputs.money.value, 10)
                }), {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + auth.token
            });
            if (resData.state) {
                props.onClose();
                props.onAdd(resData.list_transaction_present);
                auth.setWallet(resData.wallet);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return <React.Fragment>
        <form action="" className="add-transaction">
            <div className="add-transaction__header">
                <div className="add-transaction__item">
                    <label htmlFor="">Danh mục</label>
                    <div className="add-transaction__category-container" ref={categoryRef}  >
                        <div className="add-transaction__category">
                            <div className="add-transaction__category-field">
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
                <div className="add-transaction__item">
                    <Input id="start_date"
                        text="Ngày bắt đầu"
                        element="datepicker"
                        onInput={inputHandler}
                        width="100%"
                        value={formState.inputs.start_date.value}
                        initialIsValid={true} />
                </div>
                <div className="add-transaction__item">
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
                <div className="add-transaction__item">
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
                <div className="add-transaction__item">
                    <label htmlFor="">Đơn vị tiền tệ</label>
                    <select className="dropdown__currency" value={currancy} onChange={currancyChange}>
                        <option value="VND">VNĐ</option>
                    </select>
                </div>
            </div>
            <div className="add-transaction__footer">
                {periodValue !== "P0D" && <div className="add-transaction__item">
                    <Input id="end_date"
                        text="Ngày kết thúc"
                        element="datepicker"
                        onInput={inputHandler}
                        width="100%"
                        value={formState.inputs.end_date.value}
                        initialIsValid={true} />
                </div>}
                <div className="add-transaction__item">
                    <label htmlFor="">Lặp lại</label>
                    <Select
                        style={{
                            width: 200
                        }}
                        defaultValue="P0D"
                        onChange={periodValueChange}
                        value={periodValue}
                    >
                        <Select.Option value="P0D">Không lặp lại</Select.Option>
                        <Select.Option value="P1D">1 ngày</Select.Option>
                        <Select.Option value="P2D">2 ngày</Select.Option>
                        <Select.Option value="P1W">1 tuần</Select.Option>
                        <Select.Option value="P2W">2 tuần</Select.Option>
                        <Select.Option value="P1M">1 tháng</Select.Option>
                    </Select>
                </div>
                <button
                    disabled={!formState.isValid || isLoading}
                    onClick={addTransactionHandler}
                    className={`add-btn ${!formState.isValid && 'disabled-btn'} 
                    ${isLoading && 'isLoading-btn'}`}>
                    Thêm giao dịch
                </button>
            </div>
        </form>
    </React.Fragment>
};

export default AddTransactionForm;