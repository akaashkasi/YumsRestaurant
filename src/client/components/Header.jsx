import './css/Header.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../../assets/images/logo.png'; // Path to your logo image
import { FaShoppingCart } from 'react-icons/fa'; // Import the shopping cart icon

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <Link to="/">
          <img src={logo} alt="Yum's Restaurant" />
        </Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/menu">Menu</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/location">Location & Hours</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li className="cart-icon">
            <Link to="/Cart">
              <FaShoppingCart />
              {/* Optionally add a counter if you have cart functionality */}
              {/* <span className="cart-counter">1</span> */}
            </Link>
          </li>
          {/* Add other anchor links for single-page navigation */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
