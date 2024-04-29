import React from "react";
import "./UserInformation.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import UserProfileHeader from "../components/UserProfile/UserProfileHeader";
import UserMainInformation from "../components/UserProfile/UserMainInformation";
import UserProfilePassword from "../components/UserProfile/UserProfilePassword";

const UserInformation = props => {
    return <React.Fragment>
        <PageContent title='Hồ sơ người dùng' >
            <UserProfileHeader />
            <UserMainInformation />
            <UserProfilePassword />
        </PageContent>
    </React.Fragment>
};

export default UserInformation;