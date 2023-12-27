import { useContext } from 'react';
import CartContext from '../context/CartContext';
import PropTypes from 'prop-types';
import '../components/css/Cart.css';
import { useNavigate } from 'react-router-dom';

function Cart({ onCheckout }) {
  let navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(CartContext);

  const goToCheckout = () => {
    localStorage.setItem('checkoutReload', 'true');
    onCheckout(cartItems);
    navigate('/checkout');
  };

  return (
    <section className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Your cart is currently empty. Please add items to your cart before
          proceeding to checkout.
        </p>
      )}
      <button
        className="proceed-button"
        onClick={goToCheckout}
        disabled={cartItems.length === 0} // Button is disabled if cart is empty
      >
        Proceed to Checkout
      </button>
    </section>
  );
}

Cart.propTypes = {
  onCheckout: PropTypes.func.isRequired,
};

export default Cart;
