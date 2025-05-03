import React from "react"

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button onClick={onClose} className="close-button">×</button>
          {children}
        </div>
      </div>
    );
  }