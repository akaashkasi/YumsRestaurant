import './css/Header.css';
import logo from '../assets/images/logo.png'; // Path to your logo image

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} alt="Yum's Restaurant" />
      </div>
      <nav className="header-nav">
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
          {/* Add other anchor links for single-page navigation */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;