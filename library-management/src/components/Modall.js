import React from 'react';
import './Modall.css';

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button className="btn btn-confirm" onClick={onConfirm}>OK</button>
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
