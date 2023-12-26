import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './client/components/Header';
import Hero from './client/components/Hero';
import About from './client/components/About';
import MenuPreview from './client/components/MenuPreview';
import Contact from './client/components/Contact';
import Location from './client/components/Location';
import Footer from './client/components/Footer';
import Cart from './client/components/Cart';
import LoadingSpinner from './client/components/LoadingSpinner'; // Import the spinner component
import Checkout from './client/components/Checkout';
import { CartProvider } from './client/context/CartContext';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }); // State to manage cart items

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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router>
      <div className="App">
        <Header />
        <CartProvider value={{ cartItems, addToCart, removeFromCart }}>
          {isLoading && <LoadingSpinner message="Loading cart..." />}
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/menu"
              element={<MenuPreview onAddToCart={addToCart} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/location" element={<Location />} />
            <Route path="/" element={<Hero />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onRemoveFromCart={removeFromCart}
                  onCheckout={() => console.log('Checkout', cartItems)} // Replace with your checkout logic
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout cartItems={cartItems} />}
            />
          </Routes>
        </CartProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
