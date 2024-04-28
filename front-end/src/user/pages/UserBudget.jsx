import React from "react";
import "./UserBudget.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import BudgetCard from "../components/BudgetComponents/BudgetCard";
import BudgetAddCard from "../components/BudgetComponents/BudgetAddCard";

const UserBudget = props => {
    const budgets = [{
        title: "Trần Minh Quân",
        wallet: "Ví tiền mặt",
        moneyLeft: 5000000,
        money: 10000000,
        start: '12/04/2024',
        end: '12/05/2024'
    },
    {
        title: "Trần Minh Quân",
        wallet: "Ví tiền mặt",
        moneyLeft: 8000000,
        money: 10000000,
        start: '12/04/2024',
        end: '12/05/2024'
    },
    {
        title: "Trần Minh Quân",
        wallet: "Ví tiền mặt",
        moneyLeft: 1000000,
        money: 10000000,
        start: '12/04/2024',
        end: '12/05/2024'
    }];

    return <React.Fragment>
        <PageContent title="Ngân sách">
            <div className="budget-container">
                <BudgetAddCard />
                {budgets.map((item) => (
                    <BudgetCard title={item.title}
                        wallet={item.wallet}
                        moneyLeft={item.moneyLeft}
                        money={item.money}
                        start={item.start}
                        end={item.end}
                    />
                ))}
            </div>
        </PageContent>
    </React.Fragment>

};

export default UserBudget;