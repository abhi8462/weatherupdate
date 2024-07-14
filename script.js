document.getElementById('get-weather-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    const apiKey = 'a7c218b6302845459f1115440241407';

    if (city) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
            const data = await response.json();
            
            if (response.ok) {
                displayWeather(data);
            } else {
                alert(data.error.message || 'City not found. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        }
    } else {
        alert('Please enter a city name.');
    }
});

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    const weatherIcon = data.current.condition.icon;
    weatherDisplay.innerHTML = `
        <p><strong>City:</strong> ${data.location.name}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
        <p><strong>Weather:</strong> ${data.current.condition.text}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity} %</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        <img class="weather-icon" src="${weatherIcon}" alt="Weather icon">
    `;
}
