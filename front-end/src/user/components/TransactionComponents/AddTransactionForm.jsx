import React, { useState, useRef, useEffect } from "react";
import "./AddTransactionForm.css";
import TransactionCategory from "./TransactionCategory";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const AddTransactionForm = props => {
    const [showCategory, setShowCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState();
    const [isRotated, setIsRotated] = useState(0);
    const categoryRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currancy, setCurrancy] = useState("VND");


    const currancyChange = (event) => {
        setCurrancy(event.target.value);
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleRotate = () => {
        setIsRotated(!isRotated);
    };

    function ShowCategoryHandler(event) {
        event.preventDefault();
        setShowCategory(!showCategory);
        handleRotate();
    }

    function handlerCategoryChange(value) {
        setCategoryValue(value);
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (categoryRef.current && !categoryRef.current.contains(event.target)) {
            setShowCategory(false);
        }
    };

    return <React.Fragment>
        <form action="" className="add-transaction">
            <div className="add-transaction__header">
                <div className="add-transaction__item">
                    <label htmlFor="">Danh mục</label>
                    <div className="add-transaction__category-container" ref={categoryRef}  >
                        <div className="add-transaction__category">
                            <div className="add-transaction__category-field">
                                <img src={`/images/${categoryValue ? categoryValue.image : 'plus.png'}`} alt="" />
                                <span>{categoryValue ? categoryValue.title : 'Chọn danh mục'}</span>
                            </div>
                            <button onClick={ShowCategoryHandler}><img className={`up-down-img ${showCategory && 'category-active'} ${isRotated ? 'rotateAnimation' : ''}`} src="/images/upload.png" alt="" /></button>
                        </div>
                        {showCategory && <TransactionCategory value={categoryValue} onCategoryChange={handlerCategoryChange} />}
                    </div>
                </div>
                <div className="add-transaction__item">
                    <label htmlFor="">Ngày</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="add-transaction__item">
                    <label htmlFor="">Ghi chú(tùy chọn)</label>
                    <input type="text" />
                </div>
                <div className="add-transaction__item">
                    <label htmlFor="">Danh mục(tùy chọn)</label>
                    <input type="text" />
                </div>
                <div className="add-transaction__item">
                    <label htmlFor="">Số tiền</label>
                    <input type="text" />
                </div>
                <div className="add-transaction__item">
                    <label htmlFor="">Đơn vị tiền tệ</label>
                    <select className="dropdown__currency" value={currancy} onChange={currancyChange}>
                        <option value="VND">VNĐ</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
            </div>
            <div className="add-transaction__footer">
                <button className="camera-btn"><img className="camera-img" src="/images/photo-camera-interface-symbol-for-button.png" alt="" /></button>
                <div className="add-transaction__item">
                    <label htmlFor="">Đơn vị tiền tệ</label>
                    <input type="text" />
                </div>
                <button className="add-btn">Thêm giao dịch</button>
            </div>
        </form>
    </React.Fragment>
};

export default AddTransactionForm;