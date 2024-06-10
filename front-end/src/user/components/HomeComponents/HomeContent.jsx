import React from "react";
import "./HomeContent.css";
import HomeImage from "./HomeImage";
import PrPointContent from "./PrPointContent";
import PrPointHistory from "./PrPointHistory";
import HomePrFeature from "./HomePrFeature";

const HomeContent = props => {
    return <div className="home-content">
        <div id="about">
            <HomeImage />
        </div>
        <div classname='home-content__item' id="content">
            <PrPointContent />
        </div>
        <div classname='home-content__item' id="history">
            <PrPointHistory />
        </div>
        <div classname='home-content__item' id="feature">
            <HomePrFeature />
        </div>
    </div>
};

export default HomeContent;