import React, { useState, useContext, useEffect } from "react";
import "./UserFeatureLinks.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";

const UserFeatureLinks = props => {
    const auth = useContext(AuthContext);
    const [settingWallet, setSettingWallet] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [wallets, setWallets] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + '/api/user/all-wallets', 'GET', null,
                    {
                        'Authorization': "Bearer " + auth.token
                    }
                )
                if (resData.state) {
                    setWallets(resData.list_wallet);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

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
                <h3>{auth.wallet.walletName}</h3>
            </div>
            <li className="user-features__li">
                <NavLink activeClassName="active_navlink" to={`/user/wallet/${auth.wallet.id}`}>
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
        </div>)
        }
        <li className="user-features__li">
            <NavLink activeClassName="active_navlink" to="/user/wallet/category">
                <div className="user-feature__item">
                    <img src="/images/category.png" alt="" />
                    Danh mục
                </div>
            </NavLink>
        </li>
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