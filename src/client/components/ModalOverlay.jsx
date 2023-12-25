import React from 'react';

const ModalOverlay = ({ currentItem, selectedSub, additionalInstructions, setAdditionalInstructions, confirmModal, closeModal, renderSubSelection }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {renderSubSelection()}
        <textarea
          value={additionalInstructions}
          onChange={(e) => setAdditionalInstructions(e.target.value)}
          placeholder="Any additional instructions?"
        />
        <button onClick={confirmModal}>Add to Order</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default ModalOverlay;