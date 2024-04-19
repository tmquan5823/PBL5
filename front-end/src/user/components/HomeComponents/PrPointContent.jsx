import React from "react";
import "./PrPointContent.css";

const PrPointContent = props => {
    return <div className="prPoint-container">
        <div className="prPoint__table">
            <table>
                <thead>
                    <tr>
                        <th>This month</th>
                        <th>Today</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="/images/business.png" alt="" /></td>
                        <td className="green-color">+3,000,000</td>
                    </tr>
                    <tr>
                        <td><img src="/images/business.png" alt="" /></td>
                        <td className="green-color">+3,000,000</td>
                    </tr>
                    <tr>
                        <td><img src="/images/business.png" alt="" /></td>
                        <td className="red-color">-50,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="prPoint__content">
            <h2>Ghi chép thu chi</h2>
            <h2 className="teal-color">dễ dàng hơn</h2>
            <p>Bạn chỉ cần vài phút để ghi lại chi tiêu hàng ngày và phân loại chúng vào các danh mục như Thức Ăn, Mua sắm, cũng như thêm thông tin về các khoản thu nhập như Lương, Quà tặng, và nhiều hơn nữa.</p>
        </div>
    </div>
};

export default PrPointContent;