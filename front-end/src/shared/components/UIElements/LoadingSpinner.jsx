import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    <div className={`loading-container ${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring">
      </div>
      <img src="/images/pig.gif" alt="" />
    </div>
  );
};

export default LoadingSpinner;
