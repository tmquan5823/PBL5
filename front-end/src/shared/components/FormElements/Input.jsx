import React, { useState, useReducer, useEffect, forwardRef, useImperativeHandle } from "react";

import "./Input.css";
import { validate } from "../../util/validators";
import Button from "./Button";
import DatePicker from 'react-datepicker';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Checkbox, Divider } from "antd";
import Category from "../../../user/components/CategoryComponent/Category";

function inputReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: action.validators ? validate(action.val, action.validators) : true
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
        case 'SET':
            return {
                ...state,
                value: action.val,
                isValid: action.isValid,
                isTouched: false
            };
        default:
            return state;
    }
}

const Input = forwardRef((props, ref) => {
    const options = props.options || [];
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || "",
        isValid: props.initialIsValid || false, isTouched: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showSelect, setShowSelect] = useState();
    const [checkedList, setCheckedList] = useState(options.map(item => item.value));
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(true);

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    const style = {
        magrin: props.magrin,
    }

    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < options.length);
        setCheckAll(list.length === options.length);
        dispatch({ type: 'CHANGE', val: list });
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? options.map(item => item.value) : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
        dispatch({ type: 'CHANGE', val: e.target.checked ? options.map(item => item.value) : [] });
    };

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid])

    useEffect(() => {
        if (props.options) {
            setCheckedList(options.map(item => item.value));
            setCheckAll(true);
            dispatch({ type: 'CHANGE', val: options.map(item => item.value) });
        }
    }, [props.options]);

    useEffect(() => {
        if (props.numberOnly && isNaN(props.value)) {
            return;
        }
        dispatch({ type: 'CHANGE', val: props.value, validators: props.validators });
    }, [props.value]);

    function changeHandler(event) {
        if (props.numberOnly && isNaN(event.target.value)) {
            return;
        }
        dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
    }

    useImperativeHandle(ref, () => ({
        setData(value, isValid) {
            if (props.element === 'select') {
                setCheckedList(value);
                setIndeterminate(!!value.length && value.length < options.length);
                setCheckAll(value.length === options.length);
            }
            dispatch({ type: 'SET', val: value, isValid });
        }
    }));

    function dateChangeHandler(date) {
        dispatch({ type: 'CHANGE', val: date, validators: props.validators });
    }

    function touchHandler(event) {
        dispatch({ type: 'TOUCH' })
    }

    const myStyle = {
        width: props.width
    }

    function showPasswordHandler() {
        setShowPassword(!showPassword);
    }

    function openSelectList() {
        setShowSelect(preval => !preval);
    }

    let element = <input
        id={props.id}
        value={inputState.value}
        type={showPassword ? 'text' : props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        style={style}
        disabled={props.disabled}
    />

    if (props.element === 'textarea') {
        element = <textarea
            id={props.id}
            value={inputState.value}
            rows={props.rows || 3}
            onChange={changeHandler}
            onBlur={touchHandler}
            style={style}
        />
    }

    if (props.element === 'datepicker') {
        element = <DatePicker
            id={props.id}
            selected={props.value || (inputState.value && new Date(inputState.value))}
            onChange={dateChangeHandler}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            shouldCloseOnSelect
        />
    }

    if (props.element === 'select') {
        element = <div className="select-list">
            <div onClick={openSelectList} className="selected-content">
                <input readOnly type="text" value={`${checkedList.length === options.length ? 'Tất cả' : checkedList.length} ${props.content}`}
                />
                <img src="/images/down-arrow.png" alt="" />
            </div>

            {showSelect && <div className="select-list-container">
                <Checkbox className="cb-checkall" indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Tất cả {props.content}
                </Checkbox>
                <Checkbox.Group value={checkedList} options={options} defaultValue={options.map(item => item.value)} onChange={onChange} />
            </div>}
        </div>
    }

    return <div style={myStyle} className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <div className="input-header">
            <label htmlFor={props.id}>{props.text}</label>
            {props.type === "password" && <img onClick={showPasswordHandler} src={`/images/${showPassword ? 'view.png' : 'hide.png'}`} alt="" />}
        </div>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
});

export default Input;  
