document.addEventListener('DOMContentLoaded', () => {
    const weatherContainer = document.getElementById('weather');
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

    // Function to fetch weather data
    function fetchWeather(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Function to display weather data
    function displayWeather(data) {
        console.log(data); // Log data to see what is returned
        const temp = data.main.temp;
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        const description = data.weather[0].description;

        const weatherHTML = `
            <img src="${icon}" alt="Weather Icon" class="weather-icon">
            <div class="weather-info">
                <div>${temp}°C</div>
                <div>${description}</div>
            </div>
        `;

        weatherContainer.innerHTML = weatherHTML;
    }

    // Function to get user's location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log(`Latitude: ${lat}, Longitude: ${lon}`); // Log the coordinates
                fetchWeather(lat, lon);
            }, error => {
                console.error('Error getting location:', error);
                weatherContainer.textContent = 'Unable to retrieve your location';
            });
        } else {
            weatherContainer.textContent = 'Geolocation is not supported by your browser';
        }
    }

    // Get the weather data when the page loads
    getLocation();
});
