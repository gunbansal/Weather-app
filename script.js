// const input=document.querySelector("input");
// const btn=document.querySelector("#btn");
// const icon=document.querySelector(".icon")
// const weather= document.querySelector(".weather")
// const temp= document.querySelector(".temp")
// const desc= document.querySelector(".description")
// const apikey='d30fdda4f98ea193607a3ade81e519a9';

// btn.addEventListener("click",()=>{
//     let city=input.value;
//     getWeather(city);
// })


// function getWeather(city){
//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`).then(response=>response.json()).then(data=>{
//     console.log(data);
//     const iconCode=data.weather[0].icon;
//     icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon"/>`
    
//     const weatherCity=data.name;
//     const weatherCountry=data.sys.country;
//     weather.innerHTML=`${weatherCity},${weatherCountry}`;

//     let temperature=data.main.temp;
//     temperature=(temperature-273);
//     const t=temperature.toFixed(2);
//     temp.innerHTML=`${t}°C`;

//     const weatherDesc = data.weather[0].description;
//     desc.innerHTML= weatherDesc;
//   })
// }

const apiKey = "d30fdda4f98ea193607a3ade81e519a9"; // Replace with your actual OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDesc = document.getElementById("weatherDesc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const dateTime = document.getElementById("dateTime");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return;
  getWeather(city);
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }
      displayWeather(data);
    })
    .catch(() => alert("Failed to fetch weather data"));
}

function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDesc.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity;
  wind.textContent = (data.wind.speed * 3.6).toFixed(1); // m/s to km/h

  // Dynamic weather icon
  const icon = data.weather[0].main.toLowerCase();
  switch (icon) {
    case "clear":
      weatherIcon.className = "fas fa-sun";
      break;
    case "clouds":
      weatherIcon.className = "fas fa-cloud";
      break;
    case "rain":
      weatherIcon.className = "fas fa-cloud-showers-heavy";
      break;
    case "snow":
      weatherIcon.className = "fas fa-snowflake";
      break;
    case "thunderstorm":
      weatherIcon.className = "fas fa-bolt";
      break;
    default:
      weatherIcon.className = "fas fa-smog";
  }

  const now = new Date();
  dateTime.textContent = now.toLocaleString();

  weatherCard.classList.remove("hidden");
}


