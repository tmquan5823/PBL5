import React, { useEffect, useRef } from 'react';
import "./SubModal.css";

const SubModal = props => {
    const overlayRef = useRef(null);
    const style = {
        width: props.width
    }

    const handleCloseModal = e => {
        if (e.target === overlayRef.current) {
            props.onClose();
        } else {
            console.log("111")
        }
    };


    return <div style={style} className="modal-container">
        <div className=" modal-content">
            {props.content}
        </div>
        <div ref={overlayRef} onClick={handleCloseModal} className="overlay">
        </div>
    </div>
};

export default SubModal;