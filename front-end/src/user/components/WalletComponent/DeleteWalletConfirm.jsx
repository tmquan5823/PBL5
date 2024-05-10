import React, { useState, useEffect } from "react";
import "./DeleteWalletConfirm.css";

const DeleteWalletConfirm = props => {
    const [isDelete, setIsDelete] = useState();

    useEffect(() => {
        props.confirmHandler(isDelete);
    }, [isDelete]);

    function deleteHandler(event) {
        event.preventDefault();
        setIsDelete(true);
    }

    function cancelHandler(event) {
        event.preventDefault();
        setIsDelete(false);
    }

    return <div className="delete-wallet-confirm">
        <div className="dwc__header">
            <h1>Xác nhận xóa ví</h1>
        </div>
        <div className="dwc__content">
            <span>Bạn có chắc chắn muốn xóa ví này?</span>
            <div className="dwc__button-container">
                <button onClick={deleteHandler}>Xác nhận</button>
                <button onClick={cancelHandler} className="dwc__button--cancel">Hủy</button>
            </div>
        </div>
    </div>
};

export default DeleteWalletConfirm;