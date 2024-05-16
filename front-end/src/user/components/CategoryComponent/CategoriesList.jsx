import React, { useState, useRef, useEffect } from "react";
import "./CategoriesList.css";
import CategoryItem from "./CategoryItem";
import SubModal from "../../../shared/components/UIElements/SubModal";
import AddCategoryForm from "./AddCategoryForm";
import UpdateCategoryForm from "./UpdateCategoryForm";

const CategoriesList = props => {
    const [updateItem, setUpdateItem] = useState();
    const [categories, setCategories] = useState(props.items);

    useEffect(() => {
        setCategories(props.items);
    }, [props.items])

    function updateHandler(item) {
        setUpdateItem(item);
    }

    function closeHandler() {
        setUpdateItem(null);
    }

    function onDeleteCategory(id) {
        setCategories(preValue => { return preValue.filter((item) => item.category.id !== id) });
    }

    return <div className="categories-container">
        <h3>{props.title}</h3>
        <ul className="categories-list">
            {categories && categories.map(item => <li key={item.category.id} className="category-item">
                {updateItem === item.category.id ?
                    <SubModal
                        width="100%"
                        content={<UpdateCategoryForm
                            id={item.category.id}
                            name={item.category.content}
                            color={item.category.iconColor}
                            icon={item.category.iconUrl}
                            type={props.type}
                            onClose={closeHandler}
                            onUpdate={props.onUpdate}
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
                        onDelete={onDeleteCategory}
                    />}
            </li>)
            }
        </ul>
    </div>
};

export default CategoriesList;