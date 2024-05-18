import React, { useContext, useEffect, useState } from "react"
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
        money: {
            value: "",
            isValid: false
        }
    }, isValid);

    useEffect(() => {
        props.onChange && props.onChange(formState.inputs);
    }, [formState.inputs]);

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

    return <React.Fragment >
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="filter-container">
            <div className="filter__header">
                <h4>Bộ lọc</h4>
                <span>Đặt lại bộ lọc</span>
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
                />
                <Input id="note"
                    text="Theo ghi chú"
                    element="input"
                    type="text"
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                />
                <Input id="money"
                    text="Theo danh số tiền"
                    element="input"
                    type="text"
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                    options={Categories}
                />
            </div>
        </div>
    </React.Fragment >
};

export default FilterContainer;

