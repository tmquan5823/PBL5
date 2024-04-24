import React from "react";
import "./UserOverview.css";
import InfoHeader from "../../shared/components/UIElements/InfoHeader";
import Wallet from "../components/OverviewComponents/Wallet";
import PageContent from "../../shared/components/UIElements/PageContent";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";

const UserOverview = props => {
    const expense = [{ title: 'Tổng số dư', money: 1000000 },
    { title: 'Tổng thay đổi theo kì', money: -1000000 },
    { title: 'Tổng Chi Phí Theo Kì', money: 0 },
    { title: 'Tổng Thu Nhập Theo Kì', money: 0 }];

    return <React.Fragment>
        <PageContent title='Tổng quan' >
            <Wallet />
            <ExpenseRow expense={expense} />
        </PageContent>
    </React.Fragment>

};

export default UserOverview;