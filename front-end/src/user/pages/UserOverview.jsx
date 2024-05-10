import React from "react";
import "./UserOverview.css";
import InfoHeader from "../../shared/components/UIElements/InfoHeader";
import Wallet from "../components/OverviewComponents/Wallet";
import PageContent from "../../shared/components/UIElements/PageContent";
import ExpenseRow from "../../shared/components/UIElements/ExpenseRow";
import WalletContainer from "../components/OverviewComponents/WalletContainer";
import FilterContainer from "../components/TransactionComponents/FilterContainer";

const UserOverview = props => {
    const wallets = [{
        id: 1,
        name: "Ví tiền mặt",
        money: 10000000,
    },
    {
        id: 2,
        name: "Ví tiết kiệm",
        money: 1000000,
    }]

    const expense = [{ title: 'Tổng số dư', money: 1000000 },
    { title: 'Tổng thay đổi theo kì', money: -1000000 },
    { title: 'Tổng Chi Phí Theo Kì', money: 0 },
    { title: 'Tổng Thu Nhập Theo Kì', money: 0 }];

    return <React.Fragment>
        <PageContent title='Tổng quan' >
            <WalletContainer items={wallets} />
            <div className="overview-content">
                <h2>Tổng quan</h2>
                <FilterContainer />
                <ExpenseRow expense={expense} />
            </div>
        </PageContent>
    </React.Fragment>

};

export default UserOverview;