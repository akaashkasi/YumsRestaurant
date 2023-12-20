import React, { useState, useEffect } from 'react';
import '../components/css/About.css';
import restaurantImage from '../assets/images/yums.jpg'; 

function About() {

  const [showHours, setShowHours] = useState(false);

  const toggleHours = () => {
    setShowHours(!showHours);
  };

  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const currentHours = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const currentFullDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const storeHours = {
    'Sunday': 'Closed',
    'Monday': '10:30 AM - 9:30 PM',
    'Tuesday': '10:30 AM - 9:30 PM',
    'Wednesday': '10:30 AM - 9:30 PM',
    'Thursday': '10:30 AM - 9:30 PM',
    'Friday': '10:30 AM - 10:00 PM',
    'Saturday': '10:30 AM - 10:00 PM'
  };

  useEffect(() => {
    // Function to close modal when clicking outside
    const handleClickOutside = (e) => {
      if (showHours && e.target.className === 'modal-overlay') {
        setShowHours(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHours]);

  return (
    <div className="about">
      <div className="about-header">
        <h1>About Yum&apos;s Chinese Restaurant</h1>
      </div>
      <div className="about-body">
        <div className="about-left-column">
          <img src={restaurantImage} alt="Inside Yum's Chinese Restaurant" className="about-image"/>
          {/* Hours of Operation and Location */}
          <div className="about-hours-location">
            <p style={{color: "red"}}>Today's Hours ({currentFullDate})<br/>{storeHours[currentDay] || 'Closed'}</p>
            <button className="view-all-hours" onClick={toggleHours}>View All Hours</button>
            <p className="current-time">Current local time: {currentHours}</p>

            <h2>Location</h2>
            <p>787 W Poplar Ave<br/>Collierville, TN 38017</p>
            <a href="https://www.google.com/maps/search/?api=1&query=787+W+Poplar+Ave%2C+Collierville%2C+TN+38017" target="_blank" rel="noopener noreferrer">Find on Google Maps</a>
            <p>Phone: (901) 854-8880</p>
          </div>
        </div>
        <div className="about-content">
          <p>Welcome to Yum&apos;s Chinese Restaurant, a cherished family-run gem in the heart of Collierville, celebrating 20 years of culinary passion. At Yum&apos;s, we&apos;re proud to serve a mix of American and Chinese flavors, where each dish is a celebration of taste and tradition.</p>
          
          <p>As a family business, we&apos;ve spent two decades perfecting our menu to offer a diverse range of dishes that cater to all appetites. Our specialty lies in creating the perfect blend of American Chinese cuisine, featuring favorites like General Tso&apos;s Chicken and Sesame Chicken, alongside a selection of hearty sub sandwiches, succulent chicken wings, and mouth-watering fried seafood.</p>
          
          <p>Our approach to cooking is simple yet profound: every dish must be exceptional. We pride ourselves on using top-quality ingredients and cooking everything to order. From the classic savory notes of American comfort food to the subtle, intricate flavors of American Chinese cuisine, there&apos;s a plate for every palate.</p>
          
          <p>Yum&apos;s Chinese Restaurant is more than just a place to eat; it&apos;s a culinary destination where every meal is an experience to remember. We invite you to join our family table, where the love for great food and the joy of sharing it comes together. Step into our world, where every bite tells the story of our dedication to excellence in variety and flavor.</p>
        </div>
        {showHours && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-button" onClick={() => setShowHours(false)}>&times;</span>
              <h2>All Store Hours</h2>
              {Object.entries(storeHours).map(([day, hours]) => (
                <p key={day}>{day}: {hours}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
