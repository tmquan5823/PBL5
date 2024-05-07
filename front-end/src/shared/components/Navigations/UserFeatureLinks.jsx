import React, { useState } from "react";
import "./UserFeatureLinks.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const UserFeatureLinks = props => {
    const [walletState, setWalletState] = useState(true);

    function overviewOnClickHandler() {
        setWalletState(false);
    }

    return <ul className="user-features">
        <li onClick={overviewOnClickHandler}>
            <NavLink activeClassName="active_navlink" to="/user/overview">
                <div className="user-feature__item">
                    <img src="/images/analysis.png" alt="" />
                    Tổng quan
                </div>
            </NavLink>
        </li>
        {walletState && (<div className="user-features__wallet">
            <li>
                <NavLink activeClassName="active_navlink" to="/user/wallet-detail">
                    <div className="user-feature__item">
                        <img src="/images/budget.png" alt="" />
                        Tổng quan ví
                    </div>
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active_navlink" to="/user/budget">
                    <div className="user-feature__item">
                        <img src="/images/budget.png" alt="" />
                        Ngân sách
                    </div>
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active_navlink" to="/user/transaction">
                    <div className="user-feature__item">
                        <img src="/images/money-transfer.png" alt="" />
                        Giao dịch
                    </div>
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active_navlink" to="/user/chart">
                    <div className="user-feature__item">
                        <img src="/images/bar-chart.png" alt="" />
                        Cài đặt ví
                    </div>
                </NavLink>
            </li>
        </div>)
        }
        <li>
            <NavLink activeClassName="active_navlink" to="/user/information">
                <div className="user-feature__item">
                    <img src="/images/account-settings.png" alt="" />
                    Hồ sơ
                </div>
            </NavLink>
        </li>
    </ul>
};

export default UserFeatureLinks