import React, { useContext } from "react";
import "./PageContent.css";
import InfoHeader from "./InfoHeader";
import { AuthContext } from "../../context/auth-context";

const PageContent = props => {
    const auth = useContext(AuthContext);
    return <div className="page-content">
        <InfoHeader title={props.title} />
        <div className={`content__main ${auth.role === 'admin' && 'admin-main-content'}`}>
            {props.children}
        </div>
    </div>
};

export default PageContent