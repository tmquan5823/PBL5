import React from "react";
import "./StateModalCard.css";
import Modal from "./Modal";
import StateCard from "./StateCard";

const StateModalCard = props => {
    return <React.Fragment>
        <Modal
            show={props.show}
            onCancel={props.onCancel}
            center
            width="30%"
        >
            <StateCard
                onClose={props.onCancel}
                state={props.state}
                message={props.message} />
        </Modal>
    </React.Fragment>
};

export default StateModalCard;