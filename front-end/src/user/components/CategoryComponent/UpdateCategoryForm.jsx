import React, { useState, useEffect, useReducer, useCallback, useContext } from "react";
import "./UpdateCategoryForm.css";
import Icons from "../../models/Icons";
import Colors from "../../models/Colors";
import IconSelect from "../WalletComponent/IconSelect";
import ColorSelect from "../WalletComponent/ColorSelect";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";

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
                    isValid = isValid && !!action.value;
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
    const auth = useContext(AuthContext);
    const [isRotated, setIsRotated] = useState(0);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

    async function updateHandler(event) {
        event.preventDefault();
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/category", "PUT", {
                "category_id": props.id,
                "content": selectState.inputs.name.value,
                "icon_url": selectState.inputs.icon.value,
                "icon_color": selectState.inputs.color.value,
                "is_income": selectState.inputs.type.value === "income" ? true : false
            },
                {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + auth.token
                });
            if (resData.state) {
                props.onClose();
                props.onUpdate({
                    "id": resData.category_id,
                    "content": resData.content,
                    "iconUrl": resData.icon_url,
                    "iconColor": resData.icon_color,
                    "income": resData.is_income
                });
            }
        } catch (err) {
            console.log(err);
        }
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

    return <React.Fragment>
        <div className="update-category-form">
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
                <label htmlFor="">Loại danh mục</label>
                <select
                    id="type"
                    className="category-type__select"
                    value={selectState.inputs.type.value}
                    disabled
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
                <button
                    disabled={isLoading || !selectState.isValid}
                    className={`update-btn ${!selectState.isValid && "disabled-btn"} ${isLoading && "isloading-btn"}`}
                    onClick={updateHandler}
                >
                    {!isLoading ? 'Cập nhật danh mục' : ""}
                </button>
            </div>
        </div>
    </React.Fragment>
};

export default UpdateCategoryForm;