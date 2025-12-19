function refreshTemp(response) {
  let tempElement = document.querySelector("#temp-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let city = response.data.city;

  cityElement.innerHTML = city;
  tempElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "3c4ba37b00dacafa6bo5t89fa3684eff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshTemp);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

searchCity("Berlin");
