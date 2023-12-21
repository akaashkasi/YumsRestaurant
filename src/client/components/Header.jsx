import './css/Header.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../../assets/images/logo.png'; // Path to your logo image

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
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/location">Location & Hours</a></li>
          <li><a href="/contact">Contact</a></li>
          {/* Add other anchor links for single-page navigation */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
