import React from "react";
import "./AdminSideBar.css";
import SideBar from "./SideBar";
import UserFeatureLinks from "./UserFeatureLinks";
import AdminFeatureLinks from "./AdminFeatureLinks";


const AdminSideBar = props => {
    return <SideBar>
        <div className="side-bar__logo">
            <img src="/images/teal-logo.png" alt="" />
        </div>
        <AdminFeatureLinks />
    </SideBar>
};

export default AdminSideBar;