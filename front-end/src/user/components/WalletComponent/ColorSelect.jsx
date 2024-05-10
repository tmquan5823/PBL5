import React, { useState } from "react";
import "./ColorSelect.css";

const ColorSelect = props => {
    const [itemSelect, setItemSelect] = useState(props.value || "");

    const handleItemOptionChange = (event) => {
        const value = event.target.value;
        console.log(value);
        props.onOptionChange(props.id, value);
        setItemSelect(value);
    };

    return <div className="color-select">
        {props.items.map(item =>
            <label style={{ backgroundColor: item }} htmlFor={props.items.indexOf(item)} className={`color-select__item  ${itemSelect === props.items.indexOf(item) && 'checked-item'}`}>
                <input
                    name="color-item"
                    id={props.items.indexOf(item)}
                    type="radio"
                    value={item}
                    checked={itemSelect === item}
                    onChange={handleItemOptionChange} />
            </label>)}
    </div>
};

export default ColorSelect;