// Checkout.jsx
import { useContext, useEffect } from 'react';
import CartContext from '../context/CartContext';
import '../components/css/Checkout.css';

function Checkout() {
  const { cartItems, taxAmount, tipAmount } = useContext(CartContext);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

    const numericTipAmount = Number(tipAmount);

    return subtotal + taxAmount + numericTipAmount;
  };

  const handlePayment = () => {
    console.log('Processing payment...');
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul className="checkout-list">
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="checkout-tax">Tax: ${taxAmount.toFixed(2)}</p>
      <p className="checkout-tip">Tip: ${tipAmount.toFixed(2)}</p>
      <p className="checkout-total">Total: ${calculateTotal().toFixed(2)}</p>
      <button className="pay-now-button" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;
