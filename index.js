function refreshTemp(response) {
  let tempElement = document.querySelector("#temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let weatherDescElement = document.querySelector("#weather-description");
  let feelLikeElement = document.querySelector("#temp-feel");
  let feelTemp = Math.round(response.data.temperature.feels_like);
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  tempElement.innerHTML = temperature;
  weatherDescElement.innerHTML = response.data.condition.description;
  feelLikeElement.innerHTML = feelTemp;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
  iconElement.innerHTML = `<img
  src="${response.data.condition.icon_url}"
  alt="weather icon"
      class="weather-icon"
    />
  `;
  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes} ${day}, ${currentDate} ${month}`;
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "3c4ba37b00dacafa6bo5t89fa3684eff";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric
`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-data">
    <div class="weather-forecast-day">
    <strong>${formatDay(day.time)}</strong>
    </div>
    
    <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>

    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
    <strong>${Math.round(day.temperature.maximum)}°</strong>
    </div>
    <div class="weather-forecast-temperature">${Math.round(
      day.temperature.minimum
    )}°</div>
    </div>
    </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

searchCity("Mumbai");
