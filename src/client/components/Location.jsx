import './css/Location.css';

function Location() {
  const storeHours = {
    'Sunday': 'Closed',
    'Monday': '10:30 AM - 9:30 PM',
    'Tuesday': '10:30 AM - 9:30 PM',
    'Wednesday': '10:30 AM - 9:30 PM',
    'Thursday': '10:30 AM - 9:30 PM',
    'Friday': '10:30 AM - 10:00 PM',
    'Saturday': '10:30 AM - 10:00 PM'
  };

  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  const mapIframe = {
    __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.188994687218!2d-89.67829718477492!3d35.04344158034769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x887f80be3b9d5b4b%3A0x2d1e9a2c6ad0a6ae!2s787%20W%20Poplar%20Ave%2C%20Collierville%2C%20TN%2038017%2C%20USA!5e0!3m2!1sen!2s!4v1645231123456" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
  };

  return (
    <div className="location">
      <h2>Location</h2>
      <p>787 W Poplar Ave<br/>Collierville, TN 38017</p>
      <a href="https://www.google.com/maps/search/?api=1&query=787+W+Poplar+Ave%2C+Collierville%2C+TN+38017" target="_blank" rel="noopener noreferrer">Find on Google Maps</a>
      <p>Phone: (901) 854-8880</p>

      <h2>Hours of Operation</h2>
      {Object.entries(storeHours).map(([day, hours]) => (
        <p key={day} className={day === currentDay ? 'current-day' : ''}>{day}: {hours}</p>
      ))}

      <div className="location-map" dangerouslySetInnerHTML={mapIframe} />
    </div>
  );
}

export default Location;
