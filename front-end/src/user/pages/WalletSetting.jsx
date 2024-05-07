import React from "react";
import "./WalletSetting.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import WalletSettingForm from "../components/WalletComponent/WalletSettingForm";

const WalletSetting = props => {
    return <PageContent title="Cài đặt chính" >
        <WalletSettingForm />
    </PageContent>
};

export default WalletSetting;