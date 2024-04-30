import React from "react";
import "./AddTransactionForm.css";

const AddTransactionForm = props => {
    return <React.Fragment>
        <form action="" className="add-transaction">
            <div className="add-transaction__header">
                <div className="add-transaction__item">
                    <label htmlFor="">Danh mục</label>
                    <input type="text" />
                </div>
                <div className="add-transaction__item">
                    <label htmlFor="">Ngày</label>
                    <input type="text" />
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
                    <input type="text" />
                </div>
            </div>
            <div className="add-transaction__footer">

            </div>
        </form>
    </React.Fragment>
};

export default AddTransactionForm;