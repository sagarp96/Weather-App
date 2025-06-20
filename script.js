async function getData() {
  console.log("clicked");
  const cityInput = document.getElementById("Searchbox").value;
  console.log(cityInput);
  document.getElementById("Searchbox").value = "";
  const Searchbox = document.getElementById("searchBoxcontainer");
  Searchbox.style.display = "none";
  const weatherCard = document.getElementById("weatherCard");
  weatherCard.style.display = "flex";

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityInput}/today?unitGroup=metric&key=9KQHTH33M37GTCSYA3N6LELBF&contentType=json`
    );
    const data = await response.json();
    console.log(data);
    const city = data.address;
    city.charAt(0).toUpperCase() + city.slice(1);
    const temp = data.days[0].temp + "°C";
    const maxtemp = data.days[0].tempmax + "°C";
    const mintemp = data.days[0].tempmin + "°C";
    const icon = data.days[0].icon;
    const condition = data.currentConditions.conditions;

    UpdateDom(city, temp, maxtemp, mintemp, icon, condition);

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

function UpdateDom(city, temp, maxtemp, mintemp, icon, condition) {
  const cityElement = document.getElementById("cityArea");
  const tempElement = document.getElementById("currentTemp");
  const maxTempElement = document.getElementById("maxTemp");
  const minTempElement = document.getElementById("min-temp");
  const conditionElement = document.getElementById("condition");

  const iconDiv = document.getElementById("Icon");
  //Update Icon
  if (icon === "snow") {
    iconDiv.src = "Icons/Snow.svg";
  } else if (icon === "rain") {
    iconDiv.src = "Icons/Rain.svg";
  } else if (icon === "fog") {
    iconDiv.src = "Icons/Fog.svg";
  } else if (icon === "wind") {
    iconDiv.src = "Icons/Wind.svg";
  } else if (icon === "cloudy") {
    iconDiv.src = "Icons/Cloudy.svg";
  } else if (icon === "partly-cloudy-day") {
    iconDiv.src = "Icons/PPart-day.svg";
  } else if (icon === "partly-cloudy-night") {
    iconDiv.src = "Icons/PPart-day.svg";
  } else if (icon === "clear-day") {
    iconDiv.src = "Icons/Icons/clear-Day.svg";
  } else if (icon === "clear-night") {
    iconDiv.src = "Icons/Icons/Clear-Night.svg";
  } else {
    iconDiv.src = "Icons/clear-Day.svg";
  }
  cityElement.innerHTML = city;
  tempElement.innerHTML = temp;
  maxTempElement.innerHTML = maxtemp;
  minTempElement.innerHTML = mintemp;
  conditionElement.innerHTML = condition;
}

// ...existing getData and UpdateDom functions...

document.addEventListener("DOMContentLoaded", function () {
  // Add search button event listener
  const searchButton = document.getElementById("SearchButton");
  if (searchButton) {
    searchButton.addEventListener("click", getData);
  }

  // Add enter key functionality
  const searchInput = document.getElementById("Searchbox");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        getData();
        const Searchbox = document.getElementById("searchBoxcontainer");
        Searchbox.style.display = "none";
        const weatherCard = document.getElementById("weatherCard");
        weatherCard.style.display = "flex";
      }
    });
  }

  // Close button functionality
  const cardClose = document.getElementById("cardClose");
  if (cardClose) {
    cardClose.addEventListener("click", () => {
      const Searchbox = document.getElementById("searchBoxcontainer");
      Searchbox.style.display = "flex";
      const weatherCard = document.getElementById("weatherCard");
      weatherCard.style.display = "none";
    });
  }
});
