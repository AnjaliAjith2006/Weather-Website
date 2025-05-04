document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = 'bab281d79e5f1e9755a68d754cc313e7'; // Replace with your OpenWeatherMap API key
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const locationInput = document.getElementById('locationInput');

    getWeatherBtn.addEventListener('click', function () {
        const location = locationInput.value;
        if (location) {
            getWeather(location);
        }
    });

    function getWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeather(data) {
        if (data.cod === 200) {
            const weather = data.weather[0].main; // Use 'main' to match condition like 'Clear', 'Clouds', etc.
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherInfoDiv.innerHTML = `
                <h2>${data.name}</h2>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;

            // Set background image based on weather condition
            if (weather === 'Clear') {
                document.body.style.backgroundImage = "url('images/clear.jpg')";
            } else if (weather === 'Clouds') {
                document.body.style.backgroundImage = "url('images/cloud.jpg')";
            } else if (weather === 'Rain') {
                document.body.style.backgroundImage = "url('images/rain.jpg')";
            } else if (weather === 'Snow') {
                document.body.style.backgroundImage = "url('images/snow.jpg')";
            } else if (weather === 'Thunderstorm') {
                document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
            } else if (weather === 'Haze' || weather === 'Mist' || weather === 'Fog') {
                document.body.style.backgroundImage = "url('images/cloud.jpg')";
            } else {
                document.body.style.backgroundImage = "url('images/default.jpg')"; // Fallback image
            }

            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundPosition = "center";
        } else {
            weatherInfoDiv.innerHTML = `<p>Location not found</p>`;
            document.body.style.backgroundImage = "url('images/default.jpg')";
        }
    }
});
