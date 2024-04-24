import React from "react";
import "./SideBar.css";
import Button from "../FormElements/Button";


const SideBar = props => {
    return <aside className="side-bar">
        {props.children}
        <a href="/home" className="signout-btn">
            <button>
                <div className="signout-btn__content">
                    <p>Sign out</p>
                    <img src="/images/logout.png" alt="" />
                </div>
            </button>
        </a>
        <a href="" className="side-bar__help">
            <div>
                <img src="/images/question.png" alt="" />
                Help
            </div>
        </a>
    </aside>
};

export default SideBar;