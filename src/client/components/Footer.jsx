// components/Footer.jsx
import '../components/css/Footer.css'; // Make sure to create a corresponding CSS file for styling
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importing icons

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <section className="footer-section">
          <h4>About Yum&apos;s</h4>
          <p>
            Discover the story of our restaurant and our dedication to Chinese
            cuisine.
          </p>
        </section>
        <section className="footer-section">
          <h4>Contact</h4>
          <p>787 West Poplar Ave, Collierville, TN 38017</p>
          <p>(901) 854-8880</p>
        </section>
        <section className="footer-section">
          <h4>Follow Us</h4>
          {/* Icons from React Icons can be used here */}
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
          </div>
        </section>
        <section className="footer-section">
          <h4>Newsletter</h4>
          <form>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Yum&apos;s Restaurant. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
