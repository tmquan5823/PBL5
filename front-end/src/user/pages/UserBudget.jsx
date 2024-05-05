import React from "react";
import "./UserBudget.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import BudgetCard from "../components/BudgetComponents/BudgetCard";
import BudgetAddCard from "../components/BudgetComponents/BudgetAddCard";
import Budgets from "../models/Budgets";

const UserBudget = props => {
    return <React.Fragment>
        <PageContent title="Ngân sách">
            <div className="budget-container">
                <BudgetAddCard />
                {Budgets.map((item) => (
                    <BudgetCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
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