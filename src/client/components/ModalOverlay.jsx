import PropTypes from 'prop-types';

const ModalOverlay = ({
  additionalInstructions,
  setAdditionalInstructions,
  confirmModal,
  closeModal,
  renderSubSelection,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {renderSubSelection()}
        <textarea
          value={additionalInstructions}
          onChange={e => setAdditionalInstructions(e.target.value)}
          placeholder="Any additional instructions?"
        />
        <button onClick={confirmModal}>Add to Order</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

// Define prop types
ModalOverlay.propTypes = {
  additionalInstructions: PropTypes.string.isRequired,
  setAdditionalInstructions: PropTypes.func.isRequired,
  confirmModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  renderSubSelection: PropTypes.func.isRequired,
};

export default ModalOverlay;
