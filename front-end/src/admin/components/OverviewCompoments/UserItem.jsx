import React from "react";
import "./UserItem.css";

const UserItem = props => {
    return <div className="user-item">
            <div class="adForm">
                <table className="adTbl">
                    <thead>
                        <tr>
                        <th id="id">ID</th>
                        <th id="date">Date</th>
                        <th id="name">Name</th>
                        <th id="email">Email</th>
                        <th id="money">Money</th>
                        <th id="opt">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>#AHGA68</td>
                        <td>05/11/2023</td>
                        <td>Nguyễn Đức Thắng</td>
                        <td>thangconconhung@gmail.com</td>
                        <td>$300</td>
                        <td>icon</td>
                        </tr>
                        
                    </tbody>
                </table>
        </div>
    </div>
};

export default UserItem;