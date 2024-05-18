import React from "react";
import "./Category.css";

const Category = props => {
    return <div className="category">
        <div style={{ backgroundColor: props.color }} className="category__icon">
            <img src={`${props.icon ? props.icon : "/images/bell.png"} `} alt="" />
        </div>
        <span className="category__name">{props.content || ""}!</span>
    </div>
};

export default Category;