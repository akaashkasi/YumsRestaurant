import { useEffect, useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Header from './client/components/Header';
import Hero from './client/components/Hero';
import About from './client/components/About';
import MenuPreview from './client/components/MenuPreview';
import Contact from './client/components/Contact';
import Location from './client/components/Location';
import Footer from './client/components/Footer';
import Cart from './client/components/Cart';
import LoadingSpinner from './client/components/LoadingSpinner';
import Checkout from './client/components/Checkout';
import Payment from './client/components/Payment';
import { CartProvider, CartContext } from './client/context/CartContext';
import PropTypes from 'prop-types';
import './App.css';

function CheckoutGuard({ children }) {
  const { cartItems, setShowPopup } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      setShowPopup(true);
      navigate('/menu'); // Redirect to the home page or any other page
    }
  }, [cartItems, setShowPopup, navigate]);

  if (cartItems.length === 0) {
    return null;
  }

  return children;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = item => {
    setIsLoading(true);
    setCartItems(prevItems => [...prevItems, item]);
    setIsLoading(false);
  };

  const removeFromCart = itemId => {
    setIsLoading(true);
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    setIsLoading(false);
  };

  const onCheckout = () => {
    // Logic for checkout, you can customize this as needed
    console.log('Checkout initiated');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    setShowPopup,
  };

  return (
    <CartProvider value={cartContextValue}>
      <Router>
        <div className="App">
          <Header />

          {isLoading && <LoadingSpinner message="Loading cart..." />}
          {showPopup}
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/menu"
              element={<MenuPreview onCheckout={onCheckout} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/location" element={<Location />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/" element={<Hero />} />
            <Route path="/cart" element={<Cart onCheckout={onCheckout} />} />
            <Route
              path="/checkout"
              element={
                <CheckoutGuard>
                  <Checkout />
                </CheckoutGuard>
              }
            />
          </Routes>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

CheckoutGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
export default App;
