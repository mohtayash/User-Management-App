import React from 'react';

const Modal = ({ closeModal, confirmAction }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this user?</h2>
        <button onClick={confirmAction} className="btn btn-danger">Yes, Delete</button>
        <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
