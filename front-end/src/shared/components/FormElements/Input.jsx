import React, { useState, useReducer, useEffect } from "react";

import "./Input.css";
import { validate } from "../../util/validators";

function inputReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
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
    const [inputState, dispatch] = useReducer(inputReducer, { value: props.value || "", isValid: props.isValid || false, isTouched: false });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid])

    function changeHandler(event) {
        dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
    }

    function touchHandler(event) {
        dispatch({ type: 'TOUCH' })
    }

    const element = props.element === 'input'
        ? <input
            id={props.id}
            value={inputState.value}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
        />
        : <textarea
            id={props.id}
            value={inputState.value}
            rows={props.rows || 3}
            onChange={changeHandler}
            onBlur={touchHandler}
        />

    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.text}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
};

export default Input;  