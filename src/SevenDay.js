import React, { useState, useEffect } from 'react';
import './SevenDay.css';

const SevenDay = () => {
  const [cityName, setCityName] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4ca27f336dad59aa9b0c3d84c4806428&units=metric`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data.');
      }
      const weatherData = await response.json();
      // Filter data for the next 7 days from today and keep only one data point per day
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      const filteredData = {};
      weatherData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; // Extract date from dt_txt
        if (date >= currentDate && !filteredData[date]) {
          filteredData[date] = item;
        }
      });
      const next7DaysData = Object.values(filteredData);
      setForecastData(next7DaysData);
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
      <h2 className="forecast-header">7-Day Weather Forecast</h2> {/* Add CSS class for centering */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="weather-cards">
          {forecastData.map((dailyData, index) => (
            <div className="weather-card" key={index}>
              <h3>{new Date(dailyData.dt * 1000).toDateString()}</h3>
              <p>Temperature: {dailyData.main.temp}°C</p>
              <p>Weather: {dailyData.weather[0].description}</p>
              <p>Wind Speed: {dailyData.wind.speed} m/s</p>
              <p>Humidity: {dailyData.main.humidity}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SevenDay;
