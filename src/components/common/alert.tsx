import React from 'react';

interface AlertProps{
  type?:'info'|'success'|'danger'|'warning',
  message?:React.ReactNode,
  showButton?:boolean,
  closeAlert?:()=>void
}

const Alert:React.FC<AlertProps> = ({ type = 'info', message, showButton = true, closeAlert }) => {
  return (
    <div style={{margin:'20px',marginBottom:'2px'}} className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      {showButton && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={closeAlert}
        ></button>
      )}
    </div>
  );
};

export default Alert;
