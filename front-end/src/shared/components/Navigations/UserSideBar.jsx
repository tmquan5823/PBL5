import React from "react";
import "./UserSideBar.css";
import SideBar from "./SideBar";
import UserFeatureLinks from "./UserFeatureLinks";


const UserSideBar = props => {
    return <SideBar>
        <div className="side-bar__logo">
            <img src="/images/teal-logo.png" alt="" />
        </div>
        <UserFeatureLinks />
    </SideBar>
};

export default UserSideBar;