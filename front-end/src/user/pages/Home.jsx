import React from "react";
import HomeNavigation from "../../shared/components/Navigations/HomeNavigation";
import HomeContent from "../components/HomeComponents/HomeContent";
import HomeFooter from "../components/HomeComponents/HomeFooter";
import "./Home.css";

const Home = props => {
    return <div className="home-page">
        <HomeNavigation />
        <HomeContent />
        <HomeFooter />
    </div>

};

export default Home;