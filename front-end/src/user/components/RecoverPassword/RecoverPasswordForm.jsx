import React, { useState } from 'react';
import './RecoverPasswordForm.css';

const RecoverPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate email format
    if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ');
      return;
    }
    // Continue with password validation, etc.
    // ...
  };

  const handleChange = (event, setter) => {
    setter(event.target.value);
    if (emailError) {
      // Clear email error when user types
      setEmailError('');
    }
  };

  const validateEmail = (email) => {
    // Simple email validation using regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <form className='recoverpass-form' onSubmit={handleSubmit}>
      <div className='frameRe'>
        <h1>Khôi phục mật khẩu</h1>
        <div className='fieldRe'>
          <label htmlFor='email'>Email đăng nhập</label>
          <input
            id='emailRe'
            type='text'
            value={email}
            onChange={(e) => handleChange(e, setEmail)}
            placeholder='Email đăng nhập'
            required
          />
          <p style={{ margin: '0px' }} className='error'>{emailError}</p> {/* Display email error */}
          <label id='pass' htmlFor='password'>Mật khẩu</label>
          <input
            id='passwordRe'
            type='password'
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
            placeholder='Mật khẩu'
            required
          />
          <label id='pass' htmlFor='confirmPassword'>Nhập lại mật khẩu</label>
          <input
            id='confirmPasswordRe'
            type='cofirmPassword'
            value={confirmPassword}
            onChange={(e) => handleChange(e, setConfirmPassword)}
            placeholder='Nhập lại mật khẩu'
            required
          />
          <button id='button' type='submit'>Xác nhận</button>
        </div>
      </div>
    </form>
  );
};

export default RecoverPasswordForm;
