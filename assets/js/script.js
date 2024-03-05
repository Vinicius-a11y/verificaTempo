//Variaveis e seleção de elementos
const apiKey = "635cf77d6036888c5b5b3030b2b31823";
const apiCountryURL = "https://flagsapi.com/BR/shiny/64.png";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherCooontainer = document.querySelector("#weather-data");

//Funçoes
const getweatherData = async (city) => {
	const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units-metric&appid=${apiKey}&lang=pt_br`;

	const res = await fetch(apiWeatherURL);
	const data = await res.json();
	return data;
};

const showWeatherData = async (city) => {
	const data = await getweatherData(city);

	cityElement.innerText = data.name;
	tempElement.innerText = parseInt(data.main.temp);
	descElement.innerText = data.weather[0].description;
	weatherIconElement.innerText = setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
	countryElement.setAttribute("src", apiCountryURL + data.sys.apiCountry);
	humidityElement.innerText = `${data.main.humidity}%`;
	windElement.innerText = `${data.main.speed}km/h`;

	weatherCooontainer.classList.remove("hide");
};

//Eventos
searchBtn.addEventListener("click", async (e) => {
	e.preventDefault();

	const city = cityInput.value;

	showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
	if (e.code === "Enter") {
		const city = e.target.value;
		showWeatherData(city);
	}
});
