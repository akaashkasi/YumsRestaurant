import { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import '../components/css/Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, taxAmount, setTipAmount } =
    useContext(CartContext);
  const [isTipPopupOpen, setIsTipPopupOpen] = useState(false);
  const [temporaryTipAmount, setTemporaryTipAmount] = useState(0);
  const [selectedTipOption, setSelectedTipOption] = useState('none');
  const [tipError, setTipError] = useState('');

  const [localTipAmount, setLocalTipAmount] = useState(() => {
    const savedTipAmount = localStorage.getItem('tipAmount');
    return savedTipAmount ? parseFloat(savedTipAmount) : 0;
  });

  const [isTipSaved, setIsTipSaved] = useState(true);

  const openTipPopup = () => {
    setIsTipPopupOpen(true);
  };

  const closeTipPopup = () => {
    setIsTipPopupOpen(false);
  };
  const saveTipAmount = () => {
    const parsedTipAmount = parseFloat(temporaryTipAmount);
    if (!isNaN(parsedTipAmount) && parsedTipAmount >= 0) {
      setLocalTipAmount(parsedTipAmount);
      setTipAmount(parsedTipAmount);
      localStorage.setItem('tipAmount', parsedTipAmount.toFixed(2));
      setIsTipSaved(true);
      closeTipPopup();
    } else {
      setTipError('Please enter a valid, non-negative tip amount');
    }
  };

  const customTipInputRef = useRef(null);

  const handleCustomTipChange = () => {
    if (customTipInputRef.current) {
      const inputTip = parseFloat(customTipInputRef.current.value);
      setTemporaryTipAmount(inputTip >= 0 ? inputTip.toFixed(2) : '0.00');
    }
  };

  const handleTipSelection = option => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    setSelectedTipOption(option);

    // Calculate the tip based on the subtotal
    if (option !== 'custom' && option !== 'none') {
      const percentageValue = parseFloat(option) / 100;
      const calculatedTip = subtotal * percentageValue;
      setTemporaryTipAmount(
        calculatedTip >= 0 ? calculatedTip.toFixed(2) : '0.00'
      );
    } else if (option === 'none') {
      setTemporaryTipAmount('0');
    }
  };

  const formatTipAmount = () => {
    const number = parseFloat(temporaryTipAmount);
    return isNaN(number) ? '0.00' : number.toFixed(2);
  };

  const TipPopup = () => {
    const formattedTipAmount = parseFloat(temporaryTipAmount).toFixed(2);
    return (
      <div className="tip-popup">
        <div className="tip-options">
          {tipError && <div className="tip-error">{tipError}</div>}
          <button
            className={selectedTipOption === 'none' ? 'selected' : ''}
            onClick={() => handleTipSelection('none')}
          >
            No Tip
          </button>
          <button
            className={selectedTipOption === '10%' ? 'selected' : ''}
            onClick={() => handleTipSelection('10%')}
          >
            10%
          </button>
          <button
            className={selectedTipOption === '15%' ? 'selected' : ''}
            onClick={() => handleTipSelection('15%')}
          >
            15%
          </button>
          <button
            className={selectedTipOption === '20%' ? 'selected' : ''}
            onClick={() => handleTipSelection('20%')}
          >
            20%
          </button>
          <div>
            <input
              ref={customTipInputRef}
              type="number"
              placeholder="Custom Tip"
              defaultValue={formattedTipAmount}
              onChange={handleCustomTipChange}
              min="0"
              step="0.01"
            />
            <div>Selected Tip: ${formatTipAmount()}</div>
            <button onClick={saveTipAmount}>Save</button>
          </div>
        </div>
      </div>
    );
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    return subtotal + taxAmount + localTipAmount;
  };

  const handlePayment = () => {
    if (isTipSaved) {
      console.log('Processing payment...');
      navigate('/payment');
    } else {
      alert('Please save your tip amount before proceeding.');
    }
  };

  // Check if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>
          Your cart is currently empty. Please add items to your cart before
          proceeding to checkout.
        </p>
      </div>
    );
  }

  // Normal checkout display
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul className="checkout-list">
        {cartItems.map(item => (
          <li key={item.id}>
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price.toFixed(2)}</span>
            <button
              className="remove-item-button"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="checkout-tax">
        <span className="checkout-section-label">Tax:</span>
        <span className="checkout-section-value">${taxAmount.toFixed(2)}</span>
      </p>
      <div className="checkout-tip">
        <span className="checkout-section-label">Tip:</span>
        <span className="checkout-section-value">
          ${localTipAmount.toFixed(2)}
        </span>
        <button onClick={openTipPopup}>Edit Tip</button>
        {isTipPopupOpen && <TipPopup />}
      </div>
      <p className="checkout-total">
        <span className="checkout-section-label">Total:</span>
        <span className="checkout-section-value">
          ${calculateTotal().toFixed(2)}
        </span>
      </p>
      <button
        className="pay-now-button"
        onClick={handlePayment}
        disabled={!isTipSaved}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;
