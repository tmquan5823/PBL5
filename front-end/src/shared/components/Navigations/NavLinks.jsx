import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./NavLinks.css";

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to="/">About</NavLink>
        </li>
        <li>
            <NavLink to="/">Blog</NavLink>
        </li>
        <li>
            <NavLink to="/">Careers</NavLink>
        </li>
        <li>
            <NavLink to="/">Support</NavLink>
        </li>
    </ul>
};

export default NavLinks;