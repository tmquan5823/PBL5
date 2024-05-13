import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./AcpPassNew.css"


const AcpPassNew = props => {
  return (
    <form className="passnew-form">
      <div className='containerPa'>
        <img src="/images/teal-logo.png" alt="Logo" />
        <div className="framePa">
          <h1>Quên mật khẩu</h1>
          <p>
          Bạn đã thay đổi mật khẩu thành công, vui lòng đăng nhập lại!
          </p>
          <div className="fieldFg">
            <a id="linkFo" href="/login">
              Quay lại đăng nhập
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AcpPassNew;