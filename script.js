const fetchData = document.getElementById("fetchbtn");

document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetchbtn");
  const latResult = document.getElementById("lat-result");
  const longResult = document.getElementById("long-result");
  const mapContainer = document.getElementById("map-container");

  fetchButton.addEventListener("click", async () => {
    try {
      document.querySelector(".container").style.display = "none";
      document.querySelector(".results").style.display = "block";
      document.querySelector(".endResults").style.display = "block";
      // Get user's geolocation

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Display latitude and longitude
          latResult.textContent = lat;
          longResult.textContent = lon;

          const mapIframe = document.createElement("div");
          mapIframe.innerHTML = `<iframe class="mapData" src="https://maps.google.com/maps?q=${lat}, ${lon}&z=15&output=embed" width="1130" height="450" frameborder="0" style="border:0"></iframe`;
        

          mapContainer.appendChild(mapIframe);
          // Fetch weather data using fetched lat and lon
          const API_KEY = "557eee13c393c7c5d48aa199201b3a71";
          const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${API_KEY}`;

          const response = await fetch(BASE_URL);
          const data = await response.json();
          console.log(data);
          displayWeatherData(data); // Display weather data in result divs
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  });

  // Function to display weather data
  function displayWeatherData(data) {
    document.getElementById("Location").textContent = data.name;
    document.getElementById("Wind").textContent = data.wind.speed;
    document.getElementById("Humidity").textContent = data.main.humidity;
    document.getElementById("Time").textContent = data.timezone;
    document.getElementById("Pressure").textContent = data.main.pressure;
    document.getElementById("Wind_Direction").textContent = data.wind.deg;
    document.getElementById("Sunrise").textContent = data.sys.sunrise;
    document.getElementById("Feels").textContent = data.main.feels_like;
  }
});

// fetchData.addEventListener("click",(event)=>{
//     document.querySelector(".container").style.display="none";
//     document.querySelector(".results").style.display="block";
//     document.querySelector(".endResults").style.display="block";
// })
