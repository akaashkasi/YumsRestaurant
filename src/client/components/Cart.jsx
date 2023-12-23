// components/Cart.jsx
import { useState } from 'react';
import '../components/css/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // const handleAddToCart = (item) => {
  //     setCartItems([...cartItems, item]);
  // };

  const handleRemoveFromCart = itemId => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <section className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>{item.name}</span>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </section>
  );
}

export default Cart;
