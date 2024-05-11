import React, { useState, useContext } from "react";
import "./CategoryItem.css";
import DeleteCategoryConfirm from "./DeleteCategoryConfirm";
import Modal from "../../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const CategoryItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showModal, setShowModal] = useState();
    const auth = useContext(AuthContext);

    function updateHandler() {
        props.onUpdate(props.id);
    }

    function deleteHandler() {
        setShowModal(true);
    }

    function closeModalHandler() {
        setShowModal(false);
    }

    async function deleteConfirmHandler(id) {
        try {
            const resData = await sendRequest(process.env.REACT_APP_URL + "/api/user/category/" + props.id, "DELETE", null, {
                'Authorization': "Bearer " + auth.token
            });
            if (resData.state) {

            }
        } catch (err) {
            console.log(err);
        }
    }

    return <React.Fragment>
        <Modal
            center
            width="40%"
            show={showModal}
            onCancel={closeModalHandler}
        >
            <DeleteCategoryConfirm
                id={props.id}
                onDelete={deleteConfirmHandler}
                onClose={closeModalHandler} />
        </Modal>
        <div style={{ backgroundColor: props.iconColor }} className="icon-container">
            <img src={`${props.iconUrl}`} alt="" />
        </div>
        <span>{props.content}</span>
        <span>{props.transaction_times} giao dịch</span>
        <div className="button-feature-container">
            <div onClick={updateHandler} className="update-btn">
                <img src="/images/setting.png" alt="" />
            </div>
            <div onClick={deleteHandler} className="delete-btn">
                <img src="/images/bin.png" alt="" />
            </div>
        </div>
    </React.Fragment>
};

export default CategoryItem;