import React, { useContext, useEffect, useState } from "react";
import "./UserBudget.css";
import PageContent from "../../shared/components/UIElements/PageContent";
import BudgetCard from "../components/BudgetComponents/BudgetCard";
import BudgetAddCard from "../components/BudgetComponents/BudgetAddCard";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserBudget = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [budgets, setBudgets] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/budgets", "GET",
                    null, {
                    'Authorization': "Bearer " + auth.token
                });
                if (resData.state) {
                    setBudgets(resData.list_budgets);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    function addBudgetHandler(budget) {
        setBudgets(preval => [budget, ...preval]);
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <PageContent title="Ngân sách">
            <div className="budget-container">
                <BudgetAddCard
                    onAdd={addBudgetHandler}
                />
                {budgets && budgets.map((item) => (
                    <BudgetCard
                        key={item.id}
                        id={item.id}
                        title={item.name}
                        moneySpend={item.spend}
                        money={item.money}
                        start={item.dateStart}
                        end={item.dateEnd}
                    />
                ))}
            </div>
        </PageContent>
    </React.Fragment>

};

export default UserBudget;