const API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";
const URL = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherData = async (city) => {
    const fullURL = `${URL}?q=${city}&appid=${API_KEY}&units=metric`; // Changed units to metric
    try {
        const response = await fetch(fullURL);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
};

const searchCity = async () => {
    try {
        const cityInput = document.getElementById('city-input').value.trim();
        if (!cityInput) {
            throw new Error("Please enter a city name");
        }
        const weatherData = await getWeatherData(cityInput);
        showWeatherData(weatherData);
    } catch (error) {
        console.error(error.message);
        console.log("Something went wrong while fetching weather data");
    }
};

const showWeatherData = (weatherData) => {
    const cityNameElement = document.getElementById("city-name");
    const weatherTypeElement = document.getElementById("weather-type");
    const tempElement = document.getElementById("temp");
    const minTempElement = document.getElementById("min-temp");
    const maxTempElement = document.getElementById("max-temp");

    cityNameElement.innerText = weatherData.name;
    weatherTypeElement.innerText = weatherData.weather[0].main;
    tempElement.innerText = `${weatherData.main.temp}°C`;
    minTempElement.innerText = `Min: ${weatherData.main.temp_min}°C`;
    maxTempElement.innerText = `Max: ${weatherData.main.temp_max}°C`;
};
