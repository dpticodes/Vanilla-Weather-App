function refreshTemp(response) {
  let tempElement = document.querySelector("#temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let weatherDescElement = document.querySelector("#weather-description");
  let feelLikeElement = document.querySelector("#temp-feel");
  let feelTemp = Math.round(response.data.temperature.feels_like);
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = temperature;
  weatherDescElement.innerHTML = response.data.condition.description;
  feelLikeElement.innerHTML = feelTemp;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
}

function searchCity(city) {
  let apiKey = "3c4ba37b00dacafa6bo5t89fa3684eff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshTemp);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

searchCity("Mumbai");
