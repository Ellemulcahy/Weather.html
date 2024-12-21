document.addEventListener("DOMContentLoaded", () => {
    const weatherForm = document.getElementById("weatherForm");
    const cityInput = document.getElementById("city");
    const weatherInfo = document.getElementById("weatherInfo");

    async function fetchWeather(city) {
        const apiKey = "bd5e378503939ddaee76f12ad7a97608"; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            const temperature = data.main.temp;
            const condition = data.weather[0].description;
            const icon = data.weather[0].icon;

            weatherInfo.innerHTML = `
                <p>Temperature: ${temperature}°C</p>
                <p>Condition: ${condition}</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
            `;
        } catch (error) {
            weatherInfo.textContent = error.message;
        }
    }

    weatherForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            weatherInfo.textContent = "Please enter a city name.";
        }
    });
});
