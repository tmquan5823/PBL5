import React, { useState } from "react";
import "./TransactionCategory.css";

const TransactionCategory = props => {
    let tmpVal;
    let typeVal;
    if (props.value) {
        tmpVal = props.value;
        typeVal = tmpVal.id.startsWith('i') ? "income" : "outcome"
    }
    const [typeSelect, setTypeSelect] = useState(typeVal || 'outcome');
    const [itemSelect, setItemSelect] = useState(tmpVal || {});

    const handleOptionChange = (event) => {
        setTypeSelect(event.target.value);
    };

    const handleItemOptionChange = (event) => {
        console.log(event.target.value);
        const value = JSON.parse(event.target.value);
        props.onCategoryChange(value);
        setItemSelect(value);
    };

    let items;
    if (typeSelect === "outcome") {
        items = [{
            id: "o1",
            title: 'Đồ ăn & đồ uống',
            image: 'hamburger-soda.png'
        },
        {
            id: "o2",
            title: 'Đồ ăn & đồ uống',
            image: 'bell.png'
        },
        {
            id: "o3",
            title: 'Đồ ăn & đồ uống',
            image: 'hamburger-soda.png'
        },
        {
            id: "o4",
            title: 'Đồ ăn & đồ uống',
            image: 'bell.png'
        },
        ]
    } else {
        items = [{
            id: "i1",
            title: 'Lương',
            image: 'bell.png'
        },
        {
            id: "i2",
            title: 'Đồ ăn & đồ uống',
            image: 'bell.png'
        },
        {
            id: "i3",
            title: 'Đồ ăn & đồ uống',
            image: 'bell.png'
        },
        {
            id: "i4",
            title: 'Đồ ăn & đồ uống',
            image: 'bell.png'
        },
        ]
    }

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
            {items.map(item => (
                <label htmlFor={item.id} className={`transaction-category__item ${itemSelect.id === item.id && 'checked-item'}`}>
                    <input
                        name="category-item"
                        id={item.id}
                        type="radio"
                        value={JSON.stringify(item)}
                        checked={itemSelect.id === item.id}
                        onChange={handleItemOptionChange} />
                    <img src={`/images/${item.image}`} alt="" />
                    <span>{item.title}</span>
                </label>
            ))}
        </div>
    </div>
};

export default TransactionCategory;