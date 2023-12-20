// components/Contact.jsx
import '../components/css/Contact.css';

function Contact() {
    return (
      <section className="contact">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Address: 787 West Poplar Ave, Collierville, TN 38017</p>
          <p>Phone: (901) 854-8880</p>
          <p>Email: meizhang152@yahoo.com</p>
        </div>
        <div className="contact-form">
          <h3>Send us a message</h3>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    );
  }
  
  export default Contact;