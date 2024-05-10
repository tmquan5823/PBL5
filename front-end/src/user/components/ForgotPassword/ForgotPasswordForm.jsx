import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate email format
    if (validateEmail(email)) {
      // Redirect to Verify.jsx with the valid email
      history.push(`/Verify.jsx?email=${email}`);
    } else {
      setEmailError('Email không hợp lệ');
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
    // Clear email error when user types
    setEmailError('');
  };

  const validateEmail = (email) => {
    // Simple email validation using regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <form className='forgotpass-form' onSubmit={handleSubmit}>
      <div className='frameFg'>
        <h1>Quên mật khẩu</h1>
        <p>Điền email gắn với tài khoản của bạn để nhận đường dẫn thay đổi mật khẩu</p>
        <div className='fieldFg'>
          <label>Email đăng nhập</label>
          <input
            id='text'
            type='text'
            value={email}
            onChange={handleChange}
            placeholder='Email đăng nhập'
            required
          />
          <p style={{ margin: '0px' }} className='error'>{emailError}</p> {/* Display email error */}
          <button id='button' type='submit'>Xác nhận</button>
          <Link  to='/'>Quay lại đăng nhập</Link>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
