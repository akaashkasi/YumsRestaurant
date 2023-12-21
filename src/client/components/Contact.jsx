// components/Contact.jsx
import { useState } from 'react';
import '../components/css/Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form data to send:', formData);
        try{
            // Example: POST request to your server endpoint
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
        }catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className="contact">
            <div className="contact-info">
                <h2>Contact Us</h2>
                <p>Address: 787 West Poplar Ave, Collierville, TN 38017</p>
                <p>Phone: (901) 854-8880</p>
                <p>Email: yums.chinese.collierville@gmail.com</p>
            </div>
            <div className="contact-form">
                <h3>Send us a message</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Your Phone Number"
                        required
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        required
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;
