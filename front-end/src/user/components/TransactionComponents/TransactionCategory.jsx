import React, { useState, useEffect, useContext } from "react";
import "./TransactionCategory.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const TransactionCategory = props => {
    const [typeSelect, setTypeSelect] = useState(props.value ? (props.value.category.income ? 'income' : 'outcome') : 'income');
    const [itemSelect, setItemSelect] = useState(props.value || {});
    const [categories, setCategories] = useState(props.categories || {});
    const handleOptionChange = (event) => {
        setTypeSelect(event.target.value);
    };

    useEffect(() => {
        setCategories(props.categories);
    }, []);

    const handleItemOptionChange = (event) => {
        console.log(event.target.value);
        const value = JSON.parse(event.target.value);
        props.onCategoryChange(value);
        console.log(value);
        setItemSelect(value);
    };

    return <div className="transaction-category">
        <div className="transaction-category__type">
            <label htmlFor="outcome" className={`${typeSelect === "outcome" && 'checked-outcome'}`}>
                <input
                    name="category"
                    id="outcome"
                    type="radio"
                    value="outcome"
                    checked={typeSelect === 'outcome'}
                    onChange={handleOptionChange} />
                Chi tiêu
            </label>
            <label htmlFor="income" className={`${typeSelect === "income" && 'checked-income'}`}>
                <input
                    name="category"
                    id="income"
                    type="radio"
                    value="income"
                    checked={typeSelect === 'income'}
                    onChange={handleOptionChange} />
                Thu nhập
            </label>
        </div>
        <div className="transaction-category__list">
            {props.categories && (typeSelect === 'income' ? props.categories.incomes : props.categories.outcomes).map(item => (
                <label
                    htmlFor={item.category.id}
                    className={`transaction-category__item ${itemSelect.category && itemSelect.category.id === item.category.id && 'checked-item'}`}>
                    <input
                        name="category-item"
                        id={item.category.id}
                        type="radio"
                        value={JSON.stringify(item)}
                        checked={itemSelect.category && itemSelect.category.id === item.category.id}
                        onChange={handleItemOptionChange} />
                    <div style={{ backgroundColor: item.category.iconColor }} className="category-icon__container">
                        <img src={item.category.iconUrl} alt="" />
                    </div>
                    <span>{item.category.content}</span>
                </label>
            ))}
        </div>
    </div>
};

export default TransactionCategory;