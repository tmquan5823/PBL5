import React from "react";
import "./HomeFooter.css";
import ContactLinks from "../../../shared/components/Navigations/ContactLinks";

const HomeFooter = props => {
    return <div className="home-footer">
        <div className="img-container">
            <img src="/images/logo.png" alt="" />
        </div>
        <div className="contact-container">
            <ContactLinks />
            <h2>PBL5-Nhom3</h2>
            <div className="hot-contact">
                <p>(84+)948628477</p>
                <p>tmquan@gmail.com</p>
            </div>
        </div>
    </div>
};

export default HomeFooter