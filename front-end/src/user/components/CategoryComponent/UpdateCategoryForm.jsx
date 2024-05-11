import React, { useState, useEffect, useReducer, useCallback } from "react";
import "./UpdateCategoryForm.css";
import Icons from "../../models/Icons";
import Colors from "../../models/Colors";
import IconSelect from "../WalletComponent/IconSelect";
import ColorSelect from "../WalletComponent/ColorSelect";

const selectReducer = (state, action) => {
    switch (action.type) {
        case 'show-icon-list':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    icon: {
                        ...state.inputs.icon,
                        showList: !state.inputs.icon.showList,
                    }
                }
            }
        case 'show-color-list':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    color: {
                        ...state.inputs.color,
                        showList: !state.inputs.color.showList,
                    }
                }
            }
        case 'change-value':
            let isValid = true;
            for (const inputId in state.inputs) {
                if (inputId !== action.inputId) {
                    isValid = isValid && !!state.inputs[inputId].value;
                } else {
                    isValid = isValid && action.value;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value
                    }
                },
                isValid: isValid
            };
        default:
            throw new Error();
    }
};

const UpdateCategoryForm = props => {
    const [isRotated, setIsRotated] = useState(0);
    const [updateState, setUpdateState] = useState();

    const [selectState, dispatch] = useReducer(selectReducer, {
        inputs: {
            icon: {
                showList: false,
                value: props.icon
            },
            color: {
                showList: false,
                value: props.color
            },
            name: {
                value: props.name
            },
            type: {
                value: props.type
            }
        }, isValid: true
    });

    const handleRotate = () => {
        setIsRotated(!isRotated);
    };

    function showIconListHandler(event) {
        event.preventDefault();
        dispatch({ type: 'show-icon-list' });
        handleRotate();
    }

    function showColorListHandler(event) {
        event.preventDefault();
        dispatch({ type: 'show-color-list' });
        handleRotate();
    }

    const changeValueHandler = useCallback((id, value) => {
        dispatch({ type: "change-value", value: value, inputId: id });
    }, []);

    const categoryNameChangeHandler = (event) => {
        dispatch({ type: "change-value", value: event.target.value, inputId: "name" });
    };

    function typeSelectChange(event) {
        dispatch({ type: "change-value", value: event.target.value, inputId: "type" });
    }

    return <div className="update-category-form">
        <div className="ucf__item">
            <label htmlFor="">Biểu tượng</label>
            <div className="icon-field">
                <div style={{ backgroundColor: selectState.inputs.color.value }} className="icon-container">
                    <img className="select-icon-image" src={selectState.inputs.icon.value || "/images/circle-dashed.png"} alt="" />
                </div>
                <button onClick={showIconListHandler}><img className={`up-down-img ${selectState.inputs.icon.showList && 'category-active rotateAnimation'}`} src="/images/upload.png" alt="" /></button>
            </div>
            {selectState.inputs.icon.showList && <IconSelect
                id="icon"
                items={Icons}
                value={selectState.inputs.icon.value}
                onOptionChange={changeValueHandler}
            />}
        </div>
        <div className="ucf__item">
            <label htmlFor="">Màu sắc</label>
            <div className="color-field">
                <div style={{ backgroundColor: selectState.inputs.color.value }} className="color-container">
                    <div className="color-circle"></div>
                </div>
                <button onClick={showColorListHandler}><img className={`up-down-img ${selectState.inputs.color.showList && 'category-active rotateAnimation'} `} src="/images/upload.png" alt="" /></button>
            </div>
            {selectState.inputs.color.showList && <ColorSelect
                id="color"
                items={Colors}
                value={selectState.inputs.color.value}
                onOptionChange={changeValueHandler}
            />}
        </div>
        <div className="ucf__item ucf__item-name">
            <label htmlFor="">Tên danh mục</label>
            <input
                id='name'
                onChange={categoryNameChangeHandler}
                type="text"
                value={selectState.inputs.name.value}
                className="category-name"
            />
        </div>
        <div className="ucf__item ucf__item-type">
            <label htmlFor="">Tên danh mục</label>
            <select
                id="type"
                className="category-type__select"
                value={selectState.inputs.type.value}
                onChange={typeSelectChange}>
                <option value="outcome">
                    Chi tiêu
                </option>
                <option value="income">
                    Thu nhập
                </option>
            </select>
        </div>
        <div className="ucf__item ucf__item-btn">
            <button disabled={!updateState} className={`update-btn ${!updateState && "disabled-btn"}`}>Cập nhật danh mục</button>
        </div>
    </div>
};

export default UpdateCategoryForm;