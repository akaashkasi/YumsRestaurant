import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [taxAmount, setTaxAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const [tipAmount, setTipAmount] = useState(() => {
    // Retrieve tip amount from localStorage or default to 0
    const savedTipAmount = localStorage.getItem('tipAmount');
    return savedTipAmount !== null ? parseFloat(savedTipAmount) : 0;
  });

  const resetTip = () => {
    setTipAmount(0); // Reset tip amount to 0
    localStorage.setItem('tipAmount', '0'); // Update localStorage
  };

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Calculate subtotal based on item size and selectedSize or direct price
    const subtotal = cartItems.reduce((total, item) => {
      let itemPrice =
        item.size && item.selectedSize
          ? item.size[item.selectedSize]
          : item.price;

      // Ensure itemPrice is a number
      itemPrice = parseFloat(itemPrice);
      return total + (isNaN(itemPrice) ? 0 : itemPrice);
    }, 0);

    // Calculate tax based on subtotal
    const calculatedTax = parseFloat((subtotal * 0.0975).toFixed(2));
    setTaxAmount(calculatedTax);
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

  const clearCart = () => {
    setCartItems([]); // Clears the cart
    resetTip(); // Reset tip amount
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart, // Function to add items to cart
        clearCart, // Function to clear cart
        removeFromCart, // Function to remove items from cart
        taxAmount, // Tax amount
        tipAmount, // Tip amount
        setTipAmount: updateTipAmount, // Function to update tip amount
        resetTip, // Function to reset tip amount
        showPopup, // Provide showPopup state
        setShowPopup, // Provide function to set showPopup state
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
