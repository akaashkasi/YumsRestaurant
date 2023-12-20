// Assuming you've added the image to your project in the src/assets/images folder
import './css/Hero.css';
import heroImage from '../assets/images/hero-dish.jpg'; // Update the path to your hero image

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
