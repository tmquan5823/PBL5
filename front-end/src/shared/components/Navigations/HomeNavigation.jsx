import React from "react";
import "./HomeNavigation.css";
import HomeHeader from "./HomeHeader";
import NavLinks from "./NavLinks";

const HomeNavigation = props => {
    return <HomeHeader>
        <a href="/home">
            <img className="logo" src="/images/logo.png" alt="LOGO" />
        </a>
        <nav>
            <NavLinks></NavLinks>
        </nav>
    </HomeHeader>
};

export default HomeNavigation;