import '../components/css/About.css';
import restaurantImage from '../assets/images/yums.jpg'; // Replace with your actual image path

function About() {
  return (
    <div className="about">
      <div className="about-header">
        <h1>About Yum&apos;s Chinese Cuisine</h1>
      </div>
      <div className="about-body">
        <img src={restaurantImage} alt="Inside Yum's Chinese Cuisine" className="about-image"/>
        <div className="about-content">
          <p>Welcome to Yum&apos;s Chinese Cuisine, a place where flavors tell stories. Nestled in the heart of Collierville, we bring you a taste of authentic Chinese culinary excellence. Our chefs are masters of their craft, each dish is a testament to the rich tapestry of Chinese culture.</p>
          
          <p>Our journey began over two decades ago, inspired by the vibrant street food scene of Beijing. We take pride in using the freshest ingredients, sourced locally, ensuring that each bite is as nutritious as it is delicious.</p>
          
          <p>Yum&apos;s isn&apos;t just a restaurant; it&apos;s an experience. From the moment you step in, we aim to transport you to a world of aromatic spices and harmonious flavors. Join us for a meal, and let&apos;s embark on a culinary adventure together.</p>
          
          <p>Whether it&apos;s a family dinner, a romantic evening, or a festive celebration, our doors are open. Discover the true essence of Chinese cuisine right here at Yum&apos;s.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
