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

const FilterContainer = props => {
    const auth = useContext(AuthContext);
    const [categories, setCategories] = useState(props.categories);
    const [wallets, setWallets] = useState(props.wallets);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const inputRef = [
        useRef(null),
        useRef(null),
        useRef(null)
    ];
    const [formState, inputHandler, setFormData] = useForm({
        wallet: {
            value: props.wallets,
            isValid: false
        },
        category: {
            value: props.categories,
            isValid: false
        },
        note: {
            value: "",
            isValid: false
        },
    }, isValid);

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/transactions", "GET", null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setWallets(resData.list_wallets.map(item => {
                        return {
                            label: <span className="wallet-item">{item.walletName}</span>,
                            value: item.id,
                        }
                    }));
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
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        props.onChange && props.onChange(formState.inputs);
    }, [formState.inputs, props.onChange]);

    useEffect(() => {
        console.log(props.newWallet)
        if (props.newWallet) {
            setWallets(val => [...val, {
                label: <span className="wallet-item">{props.newWallet.walletName}</span>,
                value: props.newWallet.id,
            }])
        }
    }, [props.newWallet]);

    function filterResetHandler() {
        if (inputRef[0].current) {
            inputRef[0].current.setData(wallets.map(item => item.value), true);
        }
        if (inputRef[1].current) {
            inputRef[1].current.setData(categories.map(item => item.value), true);
        }
        if (inputRef[2].current) {
            inputRef[2].current.setData("", true);
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
                <Input id="wallet"
                    text="Theo ví"
                    element="select"
                    type="text"
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                    options={wallets}
                    content="nguời dùng"
                    ref={inputRef[0]}
                />
                <Input id="category"
                    text="Theo danh mục"
                    element="select"
                    type="text"
                    onInput={inputHandler}
                    initialIsValid={true}
                    width="20%"
                    options={categories}
                    content="danh mục"
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

