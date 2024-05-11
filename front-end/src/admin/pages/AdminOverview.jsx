import React from "react";
import "./AdminOverview.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import Search from "../components/OverviewComponents/Search";
import UserItem from "../components/OverviewComponents/UserItem"

const AdminOverview = props => {
    return <PageContent title="">
        <Search/>
        <UserItem/>
    </PageContent>
};

export default AdminOverview;