const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cities = require('../cities.json');
require('dotenv').config();

const router = express.Router();
const apiKey = process.env.OPENWEATHER_API_KEY;
const cache = new NodeCache({ stdTTL: 300 });



router.get('/', async (req, res) => {
  try {
    // Check cache first
    if (cache.has('weatherData')) {
      console.log('Serving from cache');
      return res.json(cache.get('weatherData'));
    }
    console.log('Request came');

    //  const url=`https://api.openweathermap.org/data/2.5/group?id=${testCityCodes}&units=metric&appid=${apiKey}`;

    const weatherData = [];
    for (const city of cities) { 
      const url = `https://api.openweathermap.org/data/2.5/weather?id=${city.CityCode}&units=metric&appid=${apiKey}`;
      console.log('API URL:', url);
      const response = await axios.get(url);
      weatherData.push({
        name: response.data.name,
        description: response.data.weather[0].description,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        visibility: response.data.visibility,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
        windSpeed: response.data.wind.speed,
        windDegree: response.data.wind.deg
      });
     
    }

    console.log('Processed Weather Data:', weatherData);
    cache.set('weatherData', weatherData);
    res.json(weatherData);
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.response?.data || err.message });
  }
});

module.exports = router;