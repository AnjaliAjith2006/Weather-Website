// script.js
document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'bab281d79e5f1e9755a68d754cc313e7'; // Replace with your OpenWeatherMap API key
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const locationInput = document.getElementById('locationInput');

    getWeatherBtn.addEventListener('click', function() {
        const location = locationInput.value;
        if (location) {
            getWeather(location);
        }
    });

    function getWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${"bab281d79e5f1e9755a68d754cc313e7"}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeather(data) {
        if (data.cod === 200) {
            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherInfoDiv.innerHTML = `
                <h2>${data.name}</h2>
                <p>Weather: ${weather}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        } else {
            weatherInfoDiv.innerHTML = `<p>Location not found</p>`;
        }
    }
});
