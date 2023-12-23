// Assuming you've added the image to your project in the src/assets/images folder
import './css/Hero.css';
import heroImage from '../../assets/images/hero-dish.jpg'; // Update the path to your hero image

function Hero() {
  const handleOrderNowClick = () => {
    // Logic, such as redirecting to the order page
    console.log('Order Now clicked');
    // For example, if using React Router:
    // history.push('/order');
  };

  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <h1>Savor the Flavor of Chinese Cuisine</h1>
        <p>
          We love no-hassle ordering. Just click the button below or go to our
          menu page, browse our vastly delicious menu for whatever you want, add
          them to your cart, and check out. Your order will be sent to the
          restaurant and will be made piping hot for when you arrive.
        </p>
        <a href="/menu">
          <button className="order-now" onClick={handleOrderNowClick}>
            Order Now
          </button>
        </a>
      </div>
    </section>
  );
}

export default Hero;
