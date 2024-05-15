import React from "react";
import "./AdminProfile.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import AdminMainInformation from "../components/AdminProfile/AdminMainInformation";
import AdminProfileHeader from "../components/AdminProfile/AdminProfileHeader";
import AdminProfilePassword from "../components/AdminProfile/AdminProfilePassword";

const AdminProfile = props => {
    return <PageContent title="Hồ sơ cá nhân">
        <AdminProfileHeader />
        <AdminMainInformation />
        <AdminProfilePassword />
    </PageContent>  
};

export default AdminProfile;