import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import './css/Payment.css';

function Payment() {
  const navigate = useNavigate();
  const { cartItems, taxAmount, clearCart } = useContext(CartContext);
  const [confirmationMethod, setConfirmationMethod] = useState('sms');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmationMethodChange = method => {
    setConfirmationMethod(method === 'email' ? email : phone);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    let errors = [];
    if (!firstName.trim()) {
      errors.push('first name');
    }
    if (!lastName.trim()) {
      errors.push('last name');
    }
    if (confirmationMethod === 'email' && !email.trim()) {
      errors.push('email');
    }
    if (confirmationMethod === 'phone' && !phone.trim()) {
      errors.push('phone number');
    }

    if (errors.length > 0) {
      alert(`Please enter your ${errors.join(', ')}.`);
      return;
    }

    handleFinalizePayment();
  };

  const [localTipAmount] = useState(() => {
    const savedTipAmount = localStorage.getItem('tipAmount');
    return savedTipAmount ? parseFloat(savedTipAmount) : 0;
  });

  const totalTaxAmount = taxAmount || 0;
  const totalTipAmount = localTipAmount || 0;

  const calculateSubtotal = () => {
    console.log('cartItems', cartItems);
    return cartItems.reduce((total, item) => {
      let itemPrice =
        item.size && item.selectedSize
          ? item.size[item.selectedSize]
          : item.price;
      return total + itemPrice;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const validTaxAmount = !isNaN(taxAmount) ? taxAmount : 0;
    const validLocalTipAmount = !isNaN(localTipAmount)
      ? parseFloat(localTipAmount)
      : 0;

    const total = subtotal + validTaxAmount + validLocalTipAmount;
    return total;
  };

  const goToOrderSummary = () => {
    navigate('/checkout');
  };

  const handleFinalizePayment = async () => {
    setIsSubmitting(true);
    const orderId = uuidv4().slice(0, 5);
    const formatOrderDetails = () => {
      return cartItems
        .map(item => {
          const price =
            item.size && item.selectedSize
              ? item.size[item.selectedSize]
              : item.price;
          return `Item: ${item.name}\nSize: ${
            item.selectedSize || 'N/A'
          }\nPrice: ${
            isNaN(price) ? 'N/A' : `$${price.toFixed(2)}`
          }\nInstructions: ${item.additionalInstructions || 'None'}`;
        })
        .join('\n\n');
    };
    const formattedOrderDetails = formatOrderDetails();
    const orderDateTime = new Date().toISOString();
    const readableOrderTime = new Date(orderDateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const data = {
      name: `${firstName} ${lastName}`,
      orderDetails: formattedOrderDetails,
      orderTime: readableOrderTime,
      orderNumber: orderId,
      paymentType: 'Credit Card',
      totalPrice: calculateTotal(),
      confirmationMethod, // Directly contains the email or phone
    };

    try {
      const response = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      clearCart();

      // Navigate to the thank you page with order ID
      navigate(`/thank-you?orderId=${orderId}`);
    } catch (error) {
      console.error('Error:', error);
      // Here you can handle errors and inform the user, for example:
      alert('There was an error processing your order. Please try again.');
    }
    setIsSubmitting(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="payment-container">
        <h2>Payment</h2>
        <p>
          Your cart is empty. Please add items to your cart before proceeding.
        </p>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <form onSubmit={handleFormSubmit}>
        <button
          onClick={goToOrderSummary}
          className="payment-back-to-summary-button"
        >
          Return to Order Summary
        </button>
        <p>* Indicates required field</p>
        <div className="payment-contact-info-section">
          <h3>Contact Info</h3>
          <div className="payment-form-row">
            <div className="payment-form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                placeholder="e.g., John"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="payment-form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                placeholder="e.g., Smith"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="payment-form-row">
            <div className="payment-form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="youremail@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="payment-form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                placeholder="(XXX) XXX-XXXX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="payment-confirmation-method">
          <h3>Confirmation Method</h3>
          <label>
            <input
              type="radio"
              name="confirmationMethod"
              value="email"
              checked={confirmationMethod === email}
              onChange={() => handleConfirmationMethodChange('email')}
            />
            Email
          </label>
          <label>
            <input
              type="radio"
              name="confirmationMethod"
              value="phone"
              checked={confirmationMethod === phone}
              onChange={() => handleConfirmationMethodChange('phone')}
            />
            Phone
          </label>
        </div>

        <div className="payment-order-readiness">
          <h3>Order Ready By</h3>
          <p>Approximately 30 minutes after placing the order.</p>
        </div>
        <h2>Payment</h2>
        <h2>Order Summary</h2>
        <ul className="payment-checkout-list">
          {cartItems.map(item => (
            <li key={item.id}>
              <span className="item-name">{item.name}</span>
              <span className="item-price">
                $
                {item.size && item.selectedSize
                  ? Number(item.size[item.selectedSize]).toFixed(2)
                  : Number(item.price).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <p className="payment-checkout-tax">
          <span className="payment-checkout-section-label">Tax:</span>
          <span className="payment-checkout-section-value">
            ${totalTaxAmount.toFixed(2)}
          </span>
        </p>
        <p className="payment-checkout-tip">
          <span className="payment-checkout-section-label">Tip:</span>
          <span className="payment-checkout-section-value">
            ${totalTipAmount.toFixed(2)}
          </span>
        </p>
        <p className="payment-checkout-total">
          <span className="payment-checkout-section-label">Total:</span>
          <span className="payment-checkout-section-value">
            ${calculateTotal().toFixed(2)}
          </span>
        </p>
        <div className="payment-payment-section">
          <h3>Payment</h3>
          <p>Payment method integration goes here.</p>
        </div>
        <button
          className="payment-pay-now-button"
          onClick={handleFinalizePayment}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Place your order'}
        </button>
      </form>
    </div>
  );
}

export default Payment;
