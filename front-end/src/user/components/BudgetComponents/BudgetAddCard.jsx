import React, { useState, useContext } from "react";
import "./BudgetAddCard.css";
import Modal from "../../../shared/components/UIElements/Modal";
import AddBudgetForm from "../BudgetComponents/AddBudgetForm";

const BudgetAddCard = props => {
    const [formShow, setFormShow] = useState(false);
    function closeHandler() {
        setFormShow(false);
    }

    function createButtonHandler() {
        setFormShow(true);
    }

    return <React.Fragment>
        <Modal
            show={formShow}
            onCancel={closeHandler}
            content={<AddBudgetForm
                onAdd={props.onAdd}
                onClose={closeHandler} />}
        >
        </Modal>
        <div className="budget-add-card">
            <p>Kiểm soát chi phí của bạn và tiết kiệm nhiều hơn bằng cách lập ngân sách!</p>
            <button onClick={createButtonHandler}>Create a New Budget</button>
        </div>
    </React.Fragment>
};

export default BudgetAddCard;