import React, { useState, useRef } from "react";
import "./CategoriesList.css";
import CategoryItem from "./CategoryItem";
import SubModal from "../../../shared/components/UIElements/SubModal";
import AddCategoryForm from "./AddCategoryForm";
import UpdateCategoryForm from "./UpdateCategoryForm";

const CategoriesList = props => {
    const [updateItem, setUpdateItem] = useState();

    function updateHandler(item) {
        setUpdateItem(item);
    }

    function closeHandler() {
        setUpdateItem(null);
    }

    return <div className="categories-container">
        <h3>{props.title}</h3>
        <ul className="categories-list">
            {props.items && props.items.map(item => <li key={item.category.id} className="category-item">
                {updateItem === item.category.id ?
                    <SubModal
                        width="100%"
                        content={<UpdateCategoryForm
                            name={item.category.content}
                            color={item.category.iconColor}
                            icon={item.category.iconUrl}
                            type={props.type}
                        />}
                        onClose={closeHandler}
                    />
                    :
                    <CategoryItem
                        id={item.category.id}
                        iconColor={item.category.iconColor}
                        iconUrl={item.category.iconUrl}
                        content={item.category.content}
                        transaction_times={item.transaction_times}
                        onUpdate={updateHandler}
                    />}
            </li>)
            }
        </ul>
    </div>
};

export default CategoriesList;