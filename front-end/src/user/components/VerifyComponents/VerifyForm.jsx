import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./VerifyForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../../shared/components/UIElements/Modal";
import StateCard from "../../../shared/components/UIElements/StateCard";

const VerifyForm = props => {
    const [verifyState, setVerifyState] = useState(false);
    const [verifyCode, setVerifyCode] = useState();
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [resMessage, setResMessage] = useState();
    const email = useParams().email;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    async function sendVerifyHandler() {
        try {
            const responseData = await sendRequest(process.env.REACT_APP_URL + '/api/auth/regenerate-otp?email=' + email, 'POST');
            console.log(responseData);
            if (responseData) {
                setVerifyState(true);
            }
        } catch (err) {
            console.log(err);
            setResMessage(err.message);
        }
    }

    function verifyCodeChangeHandler(event) {
        setVerifyCode(event.target.value);
    }

    async function verifySubmitHandler(event) {
        event.preventDefault();
        try {
            const responseData = await sendRequest(process.env.REACT_APP_URL + '/api/auth/verify-account?email=' + email + "&otp=" + verifyCode, 'POST');
            console.log(responseData);
            if (responseData.state) {
                setVerifySuccess(true);
            } else {
                setResMessage(responseData.message);
                setVerifySuccess(false);
                setShowModal(true);
            }
        } catch (err) {
            setResMessage(err.message);
            console.log(err);
        }
    }

    function closeModalHandler() {
        setShowModal(false);
    }

    return <React.Fragment>
        {<Modal
            show={showModal || error}
            onCancel={closeModalHandler}
            center
            width="30%"
        >
            <StateCard
                onClose={closeModalHandler}
                fail={!verifySuccess}
                error={error}
                message={resMessage} />
        </Modal>}

        {isLoading && <LoadingSpinner asOverlay />}
        <div className="verify-container">
            <img src="/images/teal-logo.png" alt="" />
            <h1>Xác thực Email</h1>

            <div className="verify-form__main">
                {(!verifyState) ? <div className="verify-form">
                    <p>Để có thể sử dụng tài khoản EKO, bạn cần phải xác thực email của mình!</p>
                    <button className="verify-form__btn" onClick={sendVerifyHandler}>Xác thực email</button>
                </div>
                    :
                    <form onSubmit={verifySubmitHandler} className="verify-form">
                        <span>Mã xác thực đã được gửi tới email của bạn, vui lòng kiểm tra và nhập mã để xác thực tài khoản!</span>
                        <input value={verifyCode} onChange={verifyCodeChangeHandler} className="verify-form__input" type="text" placeholder="Nhập mã xác thực" />
                        <button className="verify-form__btn">Xác thực</button>
                        <a className="resend-btn" onClick={sendVerifyHandler}>Gửi lại mã xác thực</a>
                    </form>
                }
                {verifySuccess && (
                    <span className="verify-success">
                        <p>Bạn đã xác thực thành công, vui lòng đăng nhập!</p>
                        <a href="/login">Đăng nhập</a>
                    </span>
                )}
            </div>
        </div>
    </React.Fragment>
};

export default VerifyForm;