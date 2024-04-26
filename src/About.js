// About.js

import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-heading">About Us</h2>
      <div className="about-content">
        <p>Welcome to our Weatherforecasting app, where we're passionate about bringing you the most accurate and up-to-date weather information at your fingertips. Our WeatherAPI service is designed to provide you with real-time data on the current weather conditions of any city worldwide, ensuring you're always informed and prepared, no matter where you are.</p>
        <p>At our Weatherforecasting app, we understand the importance of reliable weather information in everyday life, whether you're planning a trip, scheduling outdoor activities, or simply staying informed about local conditions. With our WeatherAPI, you can access comprehensive weather data with just a few clicks, empowering you to make informed decisions based on the latest meteorological insights.</p>
      </div>
    </div>
  );
};

export default About;
