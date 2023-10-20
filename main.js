const input = document.querySelector("input");
const searchBtn = document.querySelector("button");
const apiKey = "b9ddbd97e68f679db6e8a2c70e01d0ee";
const showWeather = document.querySelector("#show-weather");
const weatherContainer = document.querySelector(".weather-container");
const allDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const alertBox = document.querySelector(".alert-box");
const removeAlertBtn = document.querySelector(".remove-alert");
searchBtn.addEventListener("click", searchWeather);

async function searchWeather(){
  if (!input.value) {
    alertBox.style.display = "flex";
  } else {
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeather.classList.add("show-weather");
        createLiveWeather(data);
        createWeatherContainer(data);
      });
  }
};

// Remove Alert Box **********************************
removeAlertBtn.addEventListener("click", () => {
  alertBox.style.display = "none";
});

// Show Live Weather**********************************
const createLiveWeather = (data) => {
  showWeatherComponent(data);
};

// Create Show Weather Component*************************
const showWeatherComponent = (data) => {
  showWeather.innerHTML = `
    <h3>${data.city.name} , ${data.city.country}</h3>
    <div class="details">
        <img alt="icon" src="http://api.openweathermap.org/img/w/${
          data.list[0].weather[0].icon
        }.png" />
        <p>${data.list[0].weather[0].main}</p>
        <span><span><i class="bi bi-thermometer-half"></i></span> ${Math.floor(
          data.list[0].main.temp
        )} °C</span>
    </div>
    <div class="info">
        <p>Humidity : ${data.list[0].main.humidity} %</p>
        <p><span><i class="bi bi-wind"></i></span> ${
          data.list[0].wind.speed
        } km/h</p>
    </div>
    <div class="min-max-temp">
        <p><span><i class="bi bi-caret-down-fill"></i></span> ${Math.floor(
          data.list[0].main.temp_min
        )} °C</p>
        <p><span><i class="bi bi-caret-up-fill"></i></span> ${Math.floor(
          data.list[0].main.temp_max
        )} °C</p>
    </div>
    
`;
};

// Create Weather for 5 Days************************************
const createWeatherContainer = (data) => {
  weatherContainer.innerHTML = "";
  const getData = data.list.filter((val) => val.dt_txt.endsWith("12:00:00"));
  getData.forEach((item) => {
    console.log(item);
    createWeatherContainerComponent(item);
  });
};

const createWeatherContainerComponent = (item) => {
  weatherContainer.innerHTML += `
<div>
<img alt="icon" src="http://api.openweathermap.org/img/w/${
    item.weather[0].icon
  }.png" />
<h3>${allDays[new Date(item.dt * 1000).getDay()]}</h3>
<div class="container-details">
    <p>${item.weather[0].main}</p>
    <p><span><i class="bi bi-thermometer-half"></i></span> ${Math.floor(
      item.main.temp
    )} °C</p>
</div>
<div class= "container-info">
    <p>Humidity :  ${item.main.humidity} %</p>
    <p><span><i class="bi bi-wind"></i></span> ${item.wind.speed} km/h</p>
</div>
</div>

`;

  input.value = "";
  input.focus();
};
