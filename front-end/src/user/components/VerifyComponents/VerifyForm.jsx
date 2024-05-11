import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import "./VerifyForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../../shared/components/UIElements/Modal";
import StateCard from "../../../shared/components/UIElements/StateCard";
import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";



const VerifyForm = (props) => {
  const [verifyState, setVerifyState] = useState(false);
  const [verifyCode, setVerifyCode] = useState();
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resMessage, setResMessage] = useState();
  const [forgotPasswordParam, setForgotPasswordParam] = useState();
  const email = useParams().email;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  const { formState, inputHandler } = useForm(
    {
      emailReVe: {
        value: email,
        isValid: false
      },
      passwordReVe: {
        value: "",
        isValid: false
      },
    },
    false
  );
  
  async function RecoverPass(event){
    event.preventDefault();
    try {
      const resData = await sendRequest(
        process.env.REACT_APP_URL + "/api/auth/reset-password",
        "POST",
        JSON.stringify({
          email: email,
          password: formState.inputs.passwordReVe.value,
        }),
        {
          "Content-Type": 'application/json'
        }
      );
      console.log(resData);
      if (resData.state) {
        history.push('/login');
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setForgotPasswordParam(params.get("forgotpassword"));
  }, [location]);

  async function sendVerifyHandler() {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_URL + "/api/auth/regenerate-otp?email=" + email,
        "POST"
      );
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
        <img src="/images/teal-logo.png" alt="" />
        <h1>Xác thực Email</h1>

        <div className="verify-form__main">
          {!verifySuccess &&
            (!verifyState ? (
              <div className="verify-form">
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
                <form className="recoverpass-formVe">
                  <div className="frameReVe">
                    <div className="fieldReVe">
                      <label id="email">{email}</label>
                      <label id="pass" htmlFor="password">
                        Mật khẩu mới
                      </label>
                      <input
                        id="passwordReVe"
                        type="password"
                        onInput={inputHandler}
                        required
                      />
                      <label id="pass" htmlFor="confirmPassword">
                        Nhập lại mật khẩu
                      </label>
                      <input
                        id="confirmPasswordReVe"
                        type="cofirmPassword"
                        onInput={inputHandler}
                        required
                      />
                      <button onClick={RecoverPass} id="buttonVe" >
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
