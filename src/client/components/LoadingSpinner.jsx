import './css/LoadingSpinner.css'; // Make sure to create a corresponding CSS file
import PropTypes from 'prop-types';

const LoadingSpinner = ({ message }) => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>{message}</p>
  </div>
);

LoadingSpinner.propTypes = {
  message: PropTypes.string.isRequired,
};
export default LoadingSpinner;
