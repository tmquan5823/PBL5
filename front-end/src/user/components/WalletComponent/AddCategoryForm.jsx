import React, { useState } from "react";
import "./AddCategoryForm.css";
import IconSelect from "./IconSelect";
import Icons from "../../models/Icons";

const AddCategoryForm = props => {
    const [categoryIcon, setCategoryIcon] = useState();
    const [showIconList, setShowIconList] = useState();
    const [isRotated, setIsRotated] = useState(0);

    function optionChangeHandler(value) {
        setCategoryIcon(value);
    }

    const handleRotate = () => {
        setIsRotated(!isRotated);
    };

    function showIconListHandler(event) {
        event.preventDefault();
        setShowIconList(!showIconList);
        handleRotate();
    }

    return <form action="" className="add-category-form">
        <h3>Tạo danh mục mới</h3>
        <div className="add-category__content">
            <div className="add-category__item">
                <label htmlFor="">Biểu tượng</label>
                <div className="icon-field">
                    <div className="icon-container">
                        <img src={Icons[categoryIcon]} alt="" />
                    </div>
                    <button onClick={showIconListHandler}><img className={`up-down-img ${showIconList && 'category-active'} ${isRotated ? 'rotateAnimation' : ''}`} src="/images/upload.png" alt="" /></button>
                </div>
                {showIconList && <IconSelect items={Icons}
                    value={categoryIcon}
                    onOptionChange={optionChangeHandler}
                />}
            </div>
            {/* <div className="add-category__item">
                <label htmlFor="">Biểu tượng</label>
                <IconSelect items={Icons} />
            </div> */}
            <button className={`add-category__btn`}>
                Tạo danh mục
            </button>
        </div>
    </form>
};

export default AddCategoryForm;