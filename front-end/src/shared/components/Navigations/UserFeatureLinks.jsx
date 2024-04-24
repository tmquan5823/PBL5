import React from "react";
import "./UserFeatureLinks.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const UserFeatureLinks = props => {
    return <ul className="user-features">
        <li>
            <NavLink activeClassName="active_navlink" to="/users/overview">
                <div className="user-feature__item">
                    <img src="/images/analysis.png" alt="" />
                    Tổng quan
                </div>
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName="active_navlink" to="/users/budget">
                <div className="user-feature__item">
                    <img src="/images/budget.png" alt="" />
                    Ngân sách
                </div>
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName="active_navlink" to="/users/transaction">
                <div className="user-feature__item">
                    <img src="/images/money-transfer.png" alt="" />
                    Giao dịch
                </div>
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName="active_navlink" to="/users/chart">
                <div className="user-feature__item">
                    <img src="/images/bar-chart.png" alt="" />
                    Biểu đồ
                </div>
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName="active_navlink" to="/users/information">
                <div className="user-feature__item">
                    <img src="/images/account-settings.png" alt="" />
                    Hồ sơ
                </div>
            </NavLink>
        </li>
    </ul>
};

export default UserFeatureLinks