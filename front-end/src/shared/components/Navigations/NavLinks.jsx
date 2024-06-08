import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./NavLinks.css";

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <a href="#about">About</a>
        </li>
        <li>
            <a href="#content">Blog</a>
        </li>
        <li>
            <a href="#history">Careers</a>
        </li>
        <li>
            <a href="#feature">Support</a>
        </li>
    </ul>
};

export default NavLinks;