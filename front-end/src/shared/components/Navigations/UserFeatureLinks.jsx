import React, { useState, useContext } from "react";
import "./UserFeatureLinks.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../context/auth-context";
import Wallets from "../../../user/models/Wallets";

const UserFeatureLinks = props => {
    const auth = useContext(AuthContext);
    const [settingWallet, setSettingWallet] = useState(false);

    function removeWalletHandler() {
        auth.setWallet(null);
    }

    return <ul className="user-features">
        <li className="user-features__li" onClick={removeWalletHandler}>
            <NavLink activeClassName="active_navlink" to="/user/overview">
                <div className="user-feature__item">
                    <img src="/images/overview.png" alt="" />
                    Tổng quan
                </div>
            </NavLink>
        </li>
        <li className="user-features__li" onClick={removeWalletHandler}>
            <NavLink activeClassName="active_navlink" to="/user/budget">
                <div className="user-feature__item">
                    <img src="/images/budget.png" alt="" />
                    Ngân sách
                </div>
            </NavLink>
        </li>
        {auth.wallet && (<div className="user-features__wallet">
            <div className="user-feature__wallet">
                <h3>{Wallets.find(item => item.id === auth.wallet).name}</h3>
            </div>
            <li className="user-features__li">
                <NavLink activeClassName="active_navlink" to={`/user/wallet/${auth.wallet}`}>
                    <div className="user-feature__item">
                        <img src="/images/wallet-detail.png" alt="" />
                        Tổng quan ví
                    </div>
                </NavLink>
            </li>
            <li className="user-features__li">
                <NavLink activeClassName="active_navlink" to="/user/transaction">
                    <div className="user-feature__item">
                        <img src="/images/transaction.png" alt="" />
                        Giao dịch
                    </div>
                </NavLink>
            </li>
            <li className="user-features__li">
                <NavLink activeClassName="active_navlink" to="/user/wallet/setting">
                    <div className="user-feature__item">
                        <img src="/images/wallet-setting.png" alt="" />
                        Cài đặt chính
                    </div>
                </NavLink>
            </li>
            <li className="user-features__li">
                <NavLink activeClassName="active_navlink" to="/user/wallet/category">
                    <div className="user-feature__item">
                        <img src="/images/category.png" alt="" />
                        Danh mục
                    </div>
                </NavLink>
            </li>
        </div>)
        }
        <li className="user-features__li" onClick={removeWalletHandler}>
            <NavLink activeClassName="active_navlink" to="/user/information">
                <div className="user-feature__item">
                    <img src="/images/profile.png" alt="" />
                    Hồ sơ
                </div>
            </NavLink>
        </li>
    </ul>
};

export default UserFeatureLinks