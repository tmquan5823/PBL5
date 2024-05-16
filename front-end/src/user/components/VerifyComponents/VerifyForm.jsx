import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import "./VerifyForm.css";
import Input from "../../../shared/components/FormElements/Input";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../../shared/components/UIElements/Modal";
import StateCard from "../../../shared/components/UIElements/StateCard";
import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";

const VerifyForm = (props) => {
  const [verifyState, setVerifyState] = useState(false);
  const [verifyCode, setVerifyCode] = useState();
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resMessage, setResMessage] = useState();
  const [forgotPasswordParam, setForgotPasswordParam] = useState();
  const [passwordMatchError, setPasswordMatchError] = useState(false); // State để kiểm tra lỗi mật khẩu không trùng khớp
  const email = useParams().email;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const msgError = "";

  const [formState, inputHandler] = useForm(
    {
      emailReVe: {
        value: email,
        isValid: false,
      },
      passwordReVe: {
        value: "",
        isValid: false,
      },
      confirmPasswordReVe: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  async function RecoverPass(event) {
    debugger;
    event.preventDefault();
    try {
      console.log("Email: ", email);
      console.log("Password: ", formState.inputs.passwordReVe.value);
      if (formState.inputs.passwordReVe.value !== formState.inputs.confirmPasswordReVe.value) {
        setPasswordMatchError(true); // Trùng mk
        return;
      }

      const resData = await sendRequest(
        process.env.REACT_APP_URL + "/api/auth/reset-password",
        "POST",
        JSON.stringify({
          email: email,
          password: formState.inputs.passwordReVe.value,
        }),
        {
          "Content-Type": "application/json",
          // "Authorization": AuthContext.token
        }
      );
      console.log(resData);
      if (resData.state === true) {
        history.push("/recoverpassword");
      } else {
        this.msgError = resData.message;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function sendVerifyHandler() {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_URL + "/api/auth/regenerate-otp?email=" + email,
        "POST"
      );
      console.log(responseData);
      if (responseData) {
        setVerifyState(true);
        setVerifySuccess(false); // Reset verifySuccess if needed
      }
    } catch (err) {
      console.log(err);
      setResMessage(err.message);
      setShowModal(true);
    }
  }

  function verifySubmitHandler(event) {
    event.preventDefault();
    try {
      // Your existing code
    } catch (err) {
      setResMessage(err.message);
      setShowModal(true);
      console.log(err);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setForgotPasswordParam(params.get("forgotpassword"));
  }, [location]);

  function verifyCodeChangeHandler(event) {
    setVerifyCode(event.target.value);
  }

  async function verifySubmitHandler(event) {
    event.preventDefault();
    try {
      // quenpass ? /api/auth/verify-password?email= : /api/auth/verify-account?email=
      
      const responseData = await sendRequest(
        process.env.REACT_APP_URL +
          "/api/auth/verify-account?email=" +
          email +
          "&otp=" +
          verifyCode,
        "POST"
      );
      console.log(responseData);
      if (responseData.state) {
        setVerifySuccess(true);
        setVerifyState(false);
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

  //   useEffect(() => {
  //     const params = new URLSearchParams(location.search);
  //     const forgotPasswordParam = params.get("forgotpassword");

  //     if (verifySuccess && forgotPasswordParam) {
  //       // Thực hiện chuyển hướng đến trang recoverPassword
  //       history.push("/recoverpassword");
  //     }
  //   }, [verifySuccess, location.search, history]);

  return (
    <React.Fragment>
      {
        <Modal
          show={showModal || error}
          onCancel={closeModalHandler}
          center
          width="30%"
        >
          <StateCard
            onClose={closeModalHandler}
            fail={!verifySuccess}
            error={error}
            message={resMessage}
          />
        </Modal>
      }

      {isLoading && <LoadingSpinner asOverlay />}
      <div className="verify-container">
        <img src="/images/teal-logo.png" alt="" className="logoVe"/>

        <div className="verify-form__main">
          {!verifySuccess &&
            (!verifyState ? (
              <div className="verify-form">
              <h1>Xác thực Email</h1>
                <p>
                  Để có thể sử dụng tài khoản EKO, bạn cần phải xác thực email
                  của mình!
                </p>
                <button
                  className="verify-form__btn"
                  onClick={sendVerifyHandler}
                >
                  Xác thực email
                </button>
              </div>
            ) : (
              <form onSubmit={verifySubmitHandler} className="verify-form">
                <span>
                  Mã xác thực đã được gửi tới email của bạn, vui lòng kiểm tra
                  và nhập mã để xác thực tài khoản!
                </span>
                <input
                  value={verifyCode}
                  onChange={verifyCodeChangeHandler}
                  className="verify-form__input"
                  type="text"
                  placeholder="Nhập mã xác thực"
                />
                <button className="verify-form__btn">Xác thực</button>
                <a className="resend-btn" onClick={sendVerifyHandler}>
                  Gửi lại mã xác thực
                </a>
              </form>
            ))}
          {verifySuccess &&
            (!forgotPasswordParam ? (
              <span className="verify-success">
                <p>Bạn đã xác thực thành công, vui lòng đăng nhập!</p>
                <a href="/login">Đăng nhập</a>
              </span>
            ) : (
              <div>
              <h1>Thay đổi mật khẩu mới</h1>
                <form className="recoverpass-formVe">
                  <div className="frameReVe">
                    <div className="fieldReVe">
                      {/* <label id="emailVe">{email}</label> */}
                      <Input
                        id="passwordReVe"
                        element="input"
                        type="password"
                        // text="Mật khẩu mới"
                        placeholder="Mật khẩu mới"
                        onInput={inputHandler}
                        errorText="Invalid email!"
                        validators={[VALIDATOR_REQUIRE()]}
                      ></Input>
                      <Input
                        id="confirmPasswordReVe"
                        element="input"
                        type="password"
                        // text="Nhập lại mật khẩu"
                        placeholder="Nhập lại mật khẩu"
                        onInput={inputHandler}
                        errorText="Invalid email!"
                        validators={[VALIDATOR_REQUIRE()]}
                      ></Input>
                      {passwordMatchError && <p id="errVe">Mật khẩu không trùng khớp!</p>} 
                      <button onClick={RecoverPass} id="buttonVe">
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerifyForm;
