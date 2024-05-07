import React from "react";
import "./PageContent.css";
import InfoHeader from "./InfoHeader";

const PageContent = props => {
    return <div className="page-content">
        <InfoHeader title={props.title} />
        <div className="content__main">
            {props.children}
        </div>
    </div>
};

export default PageContent