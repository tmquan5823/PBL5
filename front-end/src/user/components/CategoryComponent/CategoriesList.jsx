import React from "react";
import "./CategoriesList.css";

const CategoriesList = props => {
    return <div className="categories-container">
        <h3>{props.title}</h3>
        <ul className="categories-list">
            {props.items && props.items.map(item => <li key={item.id} className="category-item">
                <div style={{ backgroundColor: item.iconColor }} className="icon-container">
                    <img src={`${item.iconUrl}`} alt="" />
                </div>
                <span>{item.content}</span>
                <span>0 giao dịch</span>
                <div className="button-feature-container">
                    <div className="update-btn">
                        <img src="/images/setting.png" alt="" />
                    </div>
                    <div className="delete-btn">
                        <img src="/images/bin.png" alt="" />
                    </div>
                </div>
            </li>)}
        </ul>
    </div>
};

export default CategoriesList;