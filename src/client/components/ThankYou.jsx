import { useSearchParams } from 'react-router-dom';
import './css/ThankYou.css'; // Import the CSS file

function ThankYou() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="thank-you-container">
      <h1 className="thank-you-title">Thank You for Your Order!</h1>
      <p className="thank-you-message">
        Your order has been placed successfully.
      </p>
      {orderId && <p className="order-id">Your Order ID: {orderId}</p>}
    </div>
  );
}

export default ThankYou;
