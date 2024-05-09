import React, { useState, useReducer, useEffect } from "react";

import "./Input.css";
import { validate } from "../../util/validators";
import Button from "./Button";
import DatePicker from 'react-datepicker';

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
        default:
            return state;
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, { value: props.value || "", isValid: props.initialIsValid || false, isTouched: false });
    const [showPassword, setShowPassword] = useState(false);

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    const style = {
        magrin: props.magrin,
    }

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid])

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
        element = <select
            id={props.id}
            value={inputState.value}
            onChange={changeHandler}
        >
            {props.options.map(option => (
                <option
                    key={option.value}
                    value={option.value}
                    selected={inputState.value === option.value}
                >
                    <span>{option.label}</span>
                </option>
            ))}
        </select>
    }

    return <div style={myStyle} className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <div className="input-header">
            <label htmlFor={props.id}>{props.text}</label>
            {props.type === "password" && <img onClick={showPasswordHandler} src={`/images/${showPassword ? 'view.png' : 'hide.png'}`} alt="" />}
        </div>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
};

export default Input;  