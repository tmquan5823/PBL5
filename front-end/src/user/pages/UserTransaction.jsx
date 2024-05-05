import React from "react";
import "./UserTransaction.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";
import DateFormat from "../../shared/help/DateFormat";
import moment from 'moment';

const UserTransaction = props => {
    return <React.Fragment>
        <PageContent title='Giao dịch' >
            <div className="transaction-header">
                <button className="add-transaction__btn">
                    Thêm giao dịch
                </button>
                <div className="calendar-container">
                    <button>&lt;</button>
                    <span>{DateFormat(moment().format('DD/MM/YYYY'))}</span>
                    <button>&gt;</button>
                </div>
            </div>
            <div className="transaction-filter">
                <h4>Bộ lọc</h4>
                <div className="transaction-filter__container">
                    <div className="transaction-filter__item">
                        <p>Theo danh mục</p>
                        <select className="dropdown__currency" value="" onChange="">
                            <option value="">Chọn...</option>
                            <option value="VND">VNĐ</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    <div className="transaction-filter__item">
                        <p>Theo danh mục</p>
                        <select className="dropdown__currency" value="" onChange="">
                            <option value="">Chọn...</option>
                            <option value="VND">VNĐ</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    <div className="transaction-filter__item">
                        <p>Theo danh mục</p>
                        <select className="dropdown__currency" value="" onChange="">
                            <option value="">Chọn...</option>
                            <option value="VND">VNĐ</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    <div className="transaction-filter__item">
                        <p>Theo danh mục</p>
                        <select className="dropdown__currency" value="" onChange="">
                            <option value="">Chọn...</option>
                            <option value="VND">VNĐ</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </div>
            </div>
            <ExpenseRow />
            <div className="transaction-history">

            </div>
        </PageContent>
    </React.Fragment>

};

export default UserTransaction;