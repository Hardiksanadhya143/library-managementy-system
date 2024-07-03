import React from 'react';
import './model.css';

const Modal = ({ message, onConfirm, title , onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
      <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-button" onClick={onConfirm}>OK</button>
          <button className="modal-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
