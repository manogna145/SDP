import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './home.css'
import moment from 'moment';
import video from './videos/sunny.mp4'; // Import the video file
import { IoThermometerOutline, IoSunnyOutline, IoSpeedometerOutline, IoWaterOutline } from 'react-icons/io5';
import SevenDayForecast from './SevenDay'; // Import the SevenDayForecast component


// Navbar component
// Navbar component
const Navbar = ({ username }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handle7DaysWeatherClick = () => {
    navigate('/seven-days-weather'); // Navigate to the '/seven-days-weather' route
  };

  return (
    <nav className="navbar">
      <div className="content">
        <ul>
          <li>
            <Link to="/home">Home</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link onClick={toggleMenu}>Menu</Link> {/* Remove menu-link class */}
            {showMenu && (
              <div className="menu-popup active">
                <p onClick={handle7DaysWeatherClick}>7 Daysweather</p> {/* Add onClick handler */}
              </div>
            )}
          </li>
          <li className="username">
            <span>Welcome, {username}!</span>
          </li>
          <li className="logout-button">
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// BottomNavbar component
const BottomNavbar = () => {
  return (
    <nav className="bottom-navbar">
      <div className="content">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// ForecastCard component
const ForecastCard = ({ data }) => {
  const date = new Date(data.dt * 1000);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[date.getDay()];

  return (
    <div className="weather-card">
      <h4>{day}</h4>
      <p>Date: {date.toLocaleDateString()}</p>
      <p><IoThermometerOutline /> Temperature: {data.main.temp}°C</p>
      <p><IoSunnyOutline /> Weather: {data.weather[0].description}</p>
      <p><IoSpeedometerOutline /> Wind Speed: {data.wind.speed} m/s</p>
      <p><IoWaterOutline /> Humidity: {data.main.humidity}%</p> 
    </div>
  );
};


// SevenDayForecast component
const SevenDayForecast = ({ cityName, onSearch }) => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setLoading(true); // Set loading to true when search button is clicked
    setError(null); // Clear any previous errors
    fetch7DayForecast(cityName); // Fetch weather data
  };

  const fetch7DayForecast = async (cityName) => {
    try {
      const todayDate = moment().format('YYYY-MM-DD');

      if (cityName.trim() === '') {
        setForecastData([]);
        setLoading(false);
        setError('Please enter a valid city name.');
        return;
      }

      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4b4ddeea4278d6e5094f2d6cf5add014&units=metric`);

      if (!response.ok) {
        console.error("Failed to fetch weather data from OpenWeatherMap.");
        setError('Failed to fetch weather data.');
        setForecastData([]);
        return;
      }

      const weatherData = await response.json();

      const filteredData = {};
      weatherData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (date === todayDate && !filteredData[date]) {
          filteredData[date] = item;
        }
      });

      const todayData = Object.values(filteredData);

      setForecastData(todayData);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError('Error fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seven-day-forecast">
      <h2>Weather Forecast for {cityName}</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button> {/* Search button */}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!error && forecastData.length > 0 && (
        <div className="weather-cards">
          {forecastData.map((dailyData) => (
            <ForecastCard key={dailyData.dt} data={dailyData} />
          ))}
        </div>
      )}
    </div>
  );
};


// Home component
const Home = ({ onLogout }) => {
  const [cityName, setCityName] = useState('');

  return (
    <div className="home-page" style={{ position: 'relative' }}>
      <Navbar username="" onLogout={onLogout} />
      <video
        autoPlay
        muted
        loop
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="content">
        <div className="weather-container">
          <h1>Welcome to the Weather App!</h1>
          <SevenDayForecast cityName={cityName} onSearch={setCityName} />
        </div>
      </div>
      <BottomNavbar></BottomNavbar>
    </div>
  );
};

export default Home;
