import React, { useContext, useEffect, useState, useRef } from "react"
import "./FilterContainer.css";
import { useForm } from "../../../shared/hooks/form-hook";
import Input from "../../../shared/components/FormElements/Input";
import { isValid } from "date-fns";
import Categories from "../../models/Categories";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Category from "../CategoryComponent/Category";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import UserItem from "../UserProfile/UserItem";

const FilterContainer = props => {
    const auth = useContext(AuthContext);
    const [categories, setCategories] = useState();
    const [users, setUsers] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const inputRef = [
        useRef(null),
        useRef(null),
        useRef(null)
    ];
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
    }, isValid);

    useEffect(() => {
        props.onChange && props.onChange(formState.inputs, props.startDate, props.endDate);
    }, [formState.inputs, props.startDate, props.endDate]);

    useEffect(() => {
        console.log(props.newCategory)
        if (props.newCategory) {
            setCategories(val => [...val, {
                label: <Category
                    icon={props.newCategory.category.iconUrl}
                    color={props.newCategory.category.iconColor}
                    content={props.newCategory.category.content}

                />,
                value: props.newCategory.category.id,
            }])
        }
    }, [props.newCategory]);

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user", "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setUsers([{
                        label: <UserItem
                            avt={resData.avatar_url}
                            name={resData.first_name + " " + resData.last_name}
                        />,
                        value: 1,
                    }]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [sendRequest]);

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/categories/" + auth.wallet.id, "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setCategories(resData.list_categories.map(item => {
                        return {
                            label: <Category
                                icon={item.category.iconUrl}
                                color={item.category.iconColor}
                                content={item.category.content}

                            />,
                            value: item.category.id,
                        }
                    }));
                    console.log(categories);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [sendRequest]);

    function filterResetHandler() {
        if (inputRef[0].current) {
            inputRef[0].current.setData(categories.map(item => item.value), true); // Thay đổi giá trị và isValid theo nhu cầu
        }
        if (inputRef[1].current) {
            inputRef[1].current.setData(users.map(item => item.value), true); // Thay đổi giá trị và isValid theo nhu cầu
        }
        if (inputRef[2].current) {
            inputRef[2].current.setData("", true); // Thay đổi giá trị và isValid theo nhu cầu
        }
    }


    return <React.Fragment >
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="filter-container">
            <div className="filter__header">
                <h4>Bộ lọc</h4>
                <span onClick={filterResetHandler}>Đặt lại bộ lọc</span>
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
                    options={categories}
                    content="danh mục"
                    ref={inputRef[0]}
                />
                <Input id="user"
                    text="Theo người"
                    element="select"
                    type="text"
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                    options={users}
                    content="nguời dùng"
                    ref={inputRef[1]}
                />
                <Input id="note"
                    text="Theo ghi chú"
                    element="input"
                    type="text"
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                    ref={inputRef[2]}
                />
            </div>
        </div>
    </React.Fragment >
};

export default FilterContainer;

