import React from "react";
import "./AdminOverview.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import Search from "../components/OverviewCompoments/Search";
import UserItem from "../components/OverviewCompoments/UserItem";

const AdminOverview = props => {
    return <PageContent title="Tổng quan người dùng">
           <Search/>
           <UserItem/>
    </PageContent>
};

export default AdminOverview;