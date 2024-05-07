import React from "react";
import "./HomeHeader.css";

const HomeHeader = props => {
    return <header className="home-header">
        {props.children}
    </header>
};

export default HomeHeader;