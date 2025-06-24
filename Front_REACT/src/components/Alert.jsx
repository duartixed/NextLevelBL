import React from 'react';
import '../styles/components/alert.scss';

const icons = {
  success: '✔️',
  error: '❌',
  info: 'ℹ️'
};

const Alert = ({ type = 'info', message, onClose }) => {
  return (
    <div className={`custom-alert ${type}`}> 
      <span style={{marginRight: '0.5rem'}}>{icons[type] || icons.info}</span>
      <span>{message}</span>
      {onClose && (
        <button className="close-btn" onClick={onClose}>&times;</button>
      )}
    </div>
  );
};

export default Alert;
