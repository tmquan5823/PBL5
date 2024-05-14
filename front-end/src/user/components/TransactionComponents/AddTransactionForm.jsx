import React, { useState, useRef, useEffect, useReducer } from "react";
import "./AddTransactionForm.css";
import TransactionCategory from "./TransactionCategory";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select } from "antd";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../../shared/util/validators";


function formReducer(state, action) {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        case "SET_DATA":
            return {
                inputs: action.inputs,
                isValid: action.formValidity
            };
        default:
            return state;
    }
}


const AddTransactionForm = props => {
    const [showCategory, setShowCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState();
    const [isRotated, setIsRotated] = useState(0);
    const categoryRef = useRef(null);
    const [selectedStart, setSelectedStart] = useState(new Date());
    const [selectedEnd, setSelectedEnd] = useState(new Date());
    const [currancy, setCurrancy] = useState("VND");
    const [formState, inputHandler] = useForm({
        money: {
            value: "",
            isValid: false
        },
        note: {
            value: "",
            isValid: false
        },
        start_date: {
            value: "",
            isValid: false
        },
        end_date: {
            value: "",
            isValid: false
        },
        cycle: {
            value: "",
            isValid: false
        }
    }, false);


    const currancyChange = (event) => {
        setCurrancy(event.target.value);
    };

    const handleStartChange = date => {
        setSelectedStart(date);
    };

    const handleEndChange = date => {
        setSelectedEnd(date);
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
                        numberOnly
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
                        value={formState.inputs.note.value}
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
                    <label htmlFor="">Lặp lại</label>
                    <Select style={{
                        width: 200
                    }}
                        defaultValue="Không lặp lại"
                    >
                        <Select.Option value="0D">Không lặp lại</Select.Option>
                        <Select.Option value="1D">1 ngày</Select.Option>
                        <Select.Option value="2D">2 ngày</Select.Option>
                        <Select.Option value="1W">1 tuần</Select.Option>
                        <Select.Option value="2W">2 tuần</Select.Option>
                        <Select.Option value="1M">1 tháng</Select.Option>
                    </Select>
                </div>
                <button className="add-btn">Thêm giao dịch</button>
            </div>
        </form>
    </React.Fragment>
};

export default AddTransactionForm;