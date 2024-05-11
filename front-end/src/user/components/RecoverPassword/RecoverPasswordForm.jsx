import React, { useContext } from 'react';
import './RecoverPasswordForm.css';
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const RecoverPasswordForm = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const history = useHistory();
  const { email } = useParams();
  const { formState, inputHandler } = useForm(
    {
      emailRe: {
        value: email,
        isValid: false
      },
      passwordRe: {
        value: "",
        isValid: false
      },
    },
    false
  );

  const RecoverPass = async (event) => {
    event.preventDefault();
    try {
      const resData = await sendRequest(
        process.env.REACT_APP_URL + "/api/auth/reset-password",
        "POST",
        JSON.stringify({
          email: formState.inputs.emailRe.value,
          password: formState.inputs.passwordRe.value,
        }),
        {
          "Content-Type": 'application/json'
        }
      );
      console.log(resData);
      if (resData.state) {
        history.push('/verify/' + formState.inputs.emailRe.value);
      }
    } catch (err) {
      // Xử lý logic khi có lỗi xảy ra
    }
  }

  return (
    <form className='recoverpass-form' onSubmit={RecoverPass}>
      <div className='frameRe'>
        <h1>Khôi phục mật khẩu</h1>
        <div className='fieldRe'>
          <label htmlFor='email'>Email đăng nhập</label>
          <input
            id='emailRe'
            type='text'
            value={formState.inputs.emailRe.value}
            onChange={inputHandler}
            name="emailRe"
            onInput={inputHandler}
            required
          />
          <label id='pass' htmlFor='password'>Mật khẩu</label>
          <input
            id='passwordRe'
            type='password'
            value={formState.inputs.passwordRe.value}
            onChange={inputHandler}
            name="passwordRe"
            onInput={inputHandler}
            required
          />
          <label id='pass' htmlFor='confirmPassword'>Nhập lại mật khẩu</label>
          <input
            id='confirmPasswordRe'
            type='password'
            value={formState.inputs.password_confirmRe.value}
            onChange={inputHandler}
            name="password_confirmRe"
            onInput={inputHandler}
            required
          />
          <button onClick={RecoverPass} id='button' type='submit' confirm>Xác nhận</button>
        </div>
      </div>
    </form>
  );
};

export default RecoverPasswordForm;
