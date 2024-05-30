import React, { useContext } from "react";
import "./PageContent.css";
import InfoHeader from "./InfoHeader";
import { AuthContext } from "../../context/auth-context";

const PageContent = props => {
    const auth = useContext(AuthContext);
    return <div className={`page-content`}>
        <InfoHeader title={props.title} />
        <div style={{ padding: props.nopadding && '0', overflow: props.overflow, }} className={`content__main ${auth.role === 'ADMIN' && 'main-content--admin'}`}>
            {props.children}
        </div>
    </div>
};

export default PageContent