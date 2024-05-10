import React, { useState, useContext, useEffect } from "react";
import "./AdminFeatureLinks.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../context/auth-context";

const AdminFeatureLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className="admin-features">
        <li className="admin-features__li">
            <NavLink activeClassName="active_navlink" to="/admin/overview">
                <div className="admin-feature__item">
                    <img src="/images/overview.png" alt="" />
                    Tổng quan
                </div>
            </NavLink>
        </li>
        <li className="admin-features__li">
            <NavLink activeClassName="active_navlink" to="/admin/message">
                <div className="admin-feature__item">
                    <img src="/images/budget.png" alt="" />
                    Tin nhắn
                </div>
            </NavLink>
        </li>
        <li className="admin-features__li">
            <NavLink activeClassName="active_navlink" to="/admin/profile">
                <div className="admin-feature__item">
                    <img src="/images/profile.png" alt="" />
                    Hồ sơ
                </div>
            </NavLink>
        </li>
    </ul>
};

export default AdminFeatureLinks;