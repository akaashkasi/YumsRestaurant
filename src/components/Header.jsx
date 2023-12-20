import React, { useState } from 'react';
import './css/Header.css';
import logo from '../assets/images/logo.png';

function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    console.log("Toggling Nav: Current state is ", !isNavVisible);
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} alt="Yum's Restaurant" />
      </div>
      <div className="hamburger" onClick={toggleNav}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
      <nav className={`header-nav ${isNavVisible ? 'visible' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          {/* Add other anchor links for single-page navigation */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
