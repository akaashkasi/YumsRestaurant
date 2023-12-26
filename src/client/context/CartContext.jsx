import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [taxAmount, setTaxAmount] = useState(0);
  const [tipAmount, setTipAmount] = useState(() => {
    // Retrieve tip amount from localStorage or default to 0
    const savedTipAmount = localStorage.getItem('tipAmount');
    return savedTipAmount !== null ? parseFloat(savedTipAmount) : 0;
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    setTaxAmount(subtotal * 0.0975);
  }, [cartItems]);

  const addToCart = item => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeFromCart = itemId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateTipAmount = newTipAmount => {
    setTipAmount(newTipAmount);
    localStorage.setItem('tipAmount', newTipAmount); // Save to localStorage
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart, // Function to add items to cart
        removeFromCart, // Function to remove items from cart
        taxAmount, // Tax amount
        tipAmount, // Tip amount
        setTipAmount: updateTipAmount, // Function to update tip amount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;
