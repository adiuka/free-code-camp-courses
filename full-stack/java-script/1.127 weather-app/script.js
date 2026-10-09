const selectedCity = document.getElementById("city-select");
const readings = document.getElementById("readings");
const scanBtn = document.getElementById("get-weather-btn");

const mainTemperatureEl = document.getElementById("main-temperature");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind");
const windGustEl = document.getElementById("wind-gust");
const weatherMainEl = document.getElementById("weather-main");
const weatherIconEl = document.getElementById("weather-icon");
const locationEl = document.getElementById("location");

async function getWeather(city) {
	try {
		const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${encodeURIComponent(city)}`);
		const weatherData = await response.json();
		return weatherData;
	} catch (err) {
		console.log(err);
	}
}

function show(value, unit = "") {
  return value === undefined || value === null ? "N/A" : `${value}${unit}`;
}

async function showWeather(city) {
	const weatherData = await getWeather(city);

	if (!weatherData) {
		alert("Something went wrong, please try again later");
		return;
	}

	const temp = weatherData.main?.temp;
	const feelsLike = weatherData.main?.feels_like;
	const humidity = weatherData.main?.humidity;
	const speed = weatherData.wind?.speed;
	const gust = weatherData.wind?.gust;
	const weatherMain = weatherData.weather?.[0]?.main;
	const icon = weatherData.weather?.[0]?.icon;
	const name = weatherData.name;

	mainTemperatureEl.textContent = show(temp, " °C");
	feelsLikeEl.textContent = show(feelsLike, " °C");
	humidityEl.textContent = show(humidity, " %");
	windSpeedEl.textContent = show(speed, " m/s");
	windGustEl.textContent = show(gust, " m/s");
	weatherMainEl.textContent = weatherMain;
	locationEl.textContent = name;

	if (icon) {
		weatherIconEl.src = icon;
	} else {
		weatherIconEl.removeAttribute("src");
	}

	readings.classList.remove("hidden");
}

scanBtn.addEventListener("click", () => {
	showWeather(selectedCity.value);
});