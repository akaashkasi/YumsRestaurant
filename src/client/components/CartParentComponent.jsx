import { useState } from 'react';
import Cart from './Cart.jsx';
import MenuPreview from './MenuPreview.jsx';

function CartParentComponent() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = item => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = itemId => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = cartItems => {
    // Implement your checkout logic here
    console.log('Checkout', cartItems);
    // For example, redirect to a payment page or process the payment
  };

  return (
    <div>
      <Cart
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
      <MenuPreview onAddToCart={addToCart} />
    </div>
  );
}

export default CartParentComponent;
