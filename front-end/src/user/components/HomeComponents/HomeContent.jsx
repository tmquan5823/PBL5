import React from "react";
import "./HomeContent.css";
import HomeImage from "./HomeImage";
import PrPointContent from "./PrPointContent";
import PrPointHistory from "./PrPointHistory";
import HomePrFeature from "./HomePrFeature";

const HomeContent = props => {
    return <div className="home-content">
        <HomeImage />
        <PrPointContent />
        <PrPointHistory />
        <HomePrFeature />
    </div>
};

export default HomeContent;