import React, { useState } from "react";
import "./IconSelect.css";

const IconSelect = props => {
    const [itemSelect, setItemSelect] = useState();

    const handleItemOptionChange = (event) => {
        const value = event.target.value;
        props.onOptionChange(props.id, value);
        setItemSelect(value);
    };

    return <div className="icon-select">
        {props.items.map(item =>
            <label htmlFor={props.items.indexOf(item)} className={`icon-select__item ${itemSelect === props.items.indexOf(item) && 'checked-item'}`}>
                <input
                    name="icon-item"
                    id={props.items.indexOf(item)}
                    type="radio"
                    value={item}
                    checked={itemSelect === item}
                    onChange={handleItemOptionChange} />
                <div className="icon-container">
                    <img src={item} alt="" />
                </div>
            </label>)}
    </div>
};

export default IconSelect;