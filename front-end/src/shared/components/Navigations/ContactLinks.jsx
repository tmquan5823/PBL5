import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./ContactLinks.css";

const ContactLinks = props => {
    return <ul className="contact-links">
        <li>
            <a href="https://www.facebook.com/profile.php?id=100026740173288">
                <img src="/images/facebook.png" alt="" />
            </a>
        </li>
        <li>
            <a href="https://www.instagram.com/tmquan58/">
                <img src="/images/instagram.png" alt="" />
            </a>
        </li>
        <li>
            <a href="https://twitter.com/TMQuan139840">
                <img src="/images/twitter.png" alt="" />
            </a>
        </li>
        <li>
            <a href="https://github.com/tmquan5823">
                <img src="/images/github.png" alt="" />
            </a>
        </li>
        <li>
            <a href="https://www.youtube.com/">
                <img src="/images/youtube.png" alt="" />
            </a>
        </li>
    </ul>
};

export default ContactLinks;