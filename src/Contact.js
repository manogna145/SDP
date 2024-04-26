// Contact.js

import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-heading">Contact Us</h2>
      <div className="contact-info">
        <p>If you have any questions, feedback, or inquiries about our Weatherforecasting app or WeatherAPI service, please don't hesitate to get in touch with us. We're here to help!</p>
        <p>You can reach us via email or phone:</p>
        <ul>
          <li>Email: info@WeatherforecastingApp.com</li>
          <li>Phone: +123-456-7890</li>
        </ul>
        <p>Alternatively, you can connect with us on social media:</p>
        <ul>
          <li>Twitter: @WeatherforecastingApp</li>
          <li>Facebook: /WeatherforecastingApp</li>
          <li>Instagram: @WeatherforecastingApp</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
