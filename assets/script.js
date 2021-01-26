// --- RetRETRIEVE WEATHER INFO ----
moment().format("L");

//  AJAX call variables
var APIKey = "b833b868df96016cabebdb7a4ca15977";
var storeCity = JSON.parse(localStorage.getItem("cities")) || [];

// load previously searched cities from local storage
function getCities() {
  for (i = 0; i < storeCity.length; i++) {
    var addCity = $("<button>");
    addCity.text(storeCity[i]).attr("class", "list-group-item");
    $(".city").append(addCity);
  }
}
getCities();

function singleDay(chosenCity) 

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
    chosenCity +
    "&appid=" +
    APIKey;
  // ajax call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // ----------------- Add Current Weather Data to Page ------------------

    // City and Date ----------------

    var currentCondition = response.weather[0].main;
    $("#current-icon").remove();
    var currentDate = moment().format("L");
    $("#current-date").text(response.name + " " + currentDate);

    // ------ Conditions for weather icon
    if (currentCondition === "Rain") {
      var weatherIcon = $(
        `<img id="current-icon" src="http://openweathermap.org/img/wn/09d.png" alt="rain-icon" />`
      );
      $("#add-icon").prepend(weatherIcon);
    }
    if (currentCondition === "Clouds") {
      var weatherIcon = $(
        `<img id="current-icon" src="http://openweathermap.org/img/wn/03d.png" alt="cloud-icon"/>`
      );
      $("#add-icon").prepend(weatherIcon);
      console.log("clouds");
    } else if (currentCondition === "Clear") {
      var weatherIcon = $(
        `<img id="current-icon" src="http://openweathermap.org/img/wn/01d.png" alt="sun-icon" />`
      );
      weatherIcon.attr("class", "icon img");
      $("#add-icon").prepend(weatherIcon);
      console.log("clear");
    } else if (currentCondition === "Drizzle") {
      var weatherIcon = $(
        `<img id="current-icon" src="http://openweathermap.org/img/wn/10d.png" alt="drizzle icon" />`
      );
      $("#add-icon").prepend(weatherIcon);
    } else if (currentCondition === "Snow") {
      var weatherIcon = $(
        `<img id="current-icon" src="http://openweathermap.org/img/wn/13d.png" alt="snow-icon" />`
      );
      $("#add-icon").prepend(weatherIcon);
    }
    // ----- City And Date ------------------
    $("#current-date").text(response.name + " " + "(" + currentDate + ")");

    // Temperature -----------------
    tempKelvin = response.main.temp;
    temp = Math.round((Number(tempKelvin) - 273.15) * 1.8 + 32);
    $("#temp").text("Temperature: " + temp + "°F");
    console.log("temp", temp);

    // Humidity ------------------
    $("#hum").text("Humidity: " + response.main.humidity + " %");

    // Wind ------------------------
    $("#wind").text("Wind Speed: " + response.wind.speed + " mph");

    //UV---------------
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    var APIkey = "b833b868df96016cabebdb7a4ca15977";
    uvURL =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      APIkey;
    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (response) {
      console.log("uv", response.value);
      $("#uv").text("UV-Index:    ");

      if (response.value <= 2) {
        var uvSpan = $("<span>");
        uvSpan.text(response.value).css("background-color", "greenyellow");
        $("#uv").append(uvSpan);
      }
      if (response.value > 2 && response.value <= 5) {
        var uvSpan = $("<span>");
        uvSpan.text(response.value).css("background-color", "yellow");
        $("#uv").append(uvSpan);
      }
      if (response.value > 5 && response.value <= 7) {
        var uvSpan = $("<span>");
        uvSpan.text(response.value).css("background-color", "orange");
        $("#uv").append(uvSpan);
      }
      if (response.value > 7 && response.value <= 11) {
        var uvSpan = $("<span>");
        uvSpan.text(response.value).css("background-color", "red");
        $("#uv").append(uvSpan);
      }
    });
  });
}

// ------------------ Five Day Forecast ---------------

function fiveDayForecast(chosenCity) {
  var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    chosenCity +
    "&appid=" +
    APIKey +
    "&units=imperial";
  // ajax call
  $.ajax({
    url: fiveDayQueryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    forecast = response.list;
    console.log("forecast", forecast);

    // --------------------empty div
    $("#five-day").empty();

    // --------------------make for loop
    for (i = 0; i < forecast.length; i += 8) {
      console.log("response.list[i]", response.list[i].dt_txt);
      //------------------make div
      fiveDayDiv = $(
        "<div class='card shadow text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
      );
      //------------------------make vars for data
      var dataDate = forecast[i].dt_txt;
      var orderDate = dataDate.substr(0, 10);
      var date = orderDate.substr(5, 10) + "-2021";

      var temp = forecast[i].main.temp;
      var humidity = forecast[i].main.humidity;

      // construct elements
      disDate = $("<h5 class:'card-title'>").text(date);
      disTemp = $("<p class='card-text'>").text("Temperature: " + temp + "°F");
      disHum = $("<p class='card-text'>").text("Humidity: " + humidity + "%");

      weatherConditions = forecast[i].weather[0].main;

      if (weatherConditions === "Clear") {
        var forecastIcon = $(
          `<img class="icon-img" src="http://openweathermap.org/img/wn/01d.png" alt="sun-icon" />`
        );
      } else if (weatherConditions === "Clouds") {
        var forecastIcon = $(
          `<img class="icon-img" src="http://openweathermap.org/img/wn/03d.png" alt="cloud-icon"/>`
        );
      } else if (weatherConditions === "Rain") {
        var forecastIcon = $(
          `<img class="icon-img" src="http://openweathermap.org/img/wn/09d.png" alt="rain-icon" />`
        );
      } else if (weatherConditions === "Drizzle") {
        var forecastIcon = $(
          `<img class="icon-img" src="http://openweathermap.org/img/wn/10d.png" alt="drizzle icon" />`
        );
      } else if (weatherConditions === "Snow") {
        var forecastIcon = $(
          `<img class="icon-img" src="http://openweathermap.org/img/wn/13d.png" alt="snow-icon" />`
        );
      }
      fiveDayDiv.append(date);
      fiveDayDiv.append(forecastIcon);
      fiveDayDiv.append(disTemp);
      fiveDayDiv.append(disHum);
      $("#five-day").append(fiveDayDiv);
    }
  });
}

// --------------- Button Events --------------------

function renderCityHistory() {
  $(".list-group-item").click(function () {
    console.log("click");
    $("#current-icon").remove();
    $("#temp").text("");
    $("#hum").text("");
    $("#wind").text("");
    $("#uv").text("");
    chosenCity = $(this).text();
    console.log("list city", chosenCity);
    singleDay(chosenCity);
    fiveDayForecast(chosenCity);
  });
}
renderCityHistory();

// When search button clicked, find city and retrieve info from API
$(".btn").click(function (event) {
  event.preventDefault();
  // clear old data
  $("#current-icon").remove();
  $("#temp").empty();
  $("#hum").empty();
  $("#wind").empty();
  $("#uv").empty();

  chosenCity = $(this).parent().find("#search").val();
  console.log("chosen city", chosenCity);

  if (chosenCity) {
    var addCity = $("<button>");
    addCity.text(chosenCity).attr("class", "list-group-item btn");
    $(".city").append(addCity);
  }

  // store city local storage
  storeCity.push(chosenCity);
  localStorage.setItem("cities", JSON.stringify(storeCity));

  renderCityHistory();
  singleDay(chosenCity);
  fiveDayForecast(chosenCity);
});

// Select city from list ----------------

// -- connect to form and save text in variable chosenCity

// -- store cities searched in local storage.

//---- click event appends chosenCity  #city-ul

// ----- BUILD ELEMENT FOR CITY LIST AND APPEND -----

// BUILD -- > <div class="col-sm-12 col-md-12 col-lg-12">

// <div class="card" id="city-list" style="width: auto">
//   <ul class="list-group list-group-flush" id="city-ul">
//   </ul>
// </div>

//  Append to #search-col

// BUILD list items:
// <li class="list-group-item">chosenCity</li>

// APPEND to #city-ul

//---- CURRENT WEATHER INFO -------

// when city is submitted -- onlick submit event from search bar - > retrieve current weather info

//----- CREATE/BUILD/APPEND WEATHER DATA INTO WEATHER-BOX -----

// Connect to-- > id="temp-current"
// $("#temp-current").text(current weather  temp data)

// Connect to ----> id="hum-current"
// $("#hum-current").text(current weather humidity data)

// Connect to ----> id="wind-current"
// $("#wind-current").text(current weather wind data)

// Connect to ----> id="uv current" and id= #uv-color
// $("#uv-current").text(current weather wind data)
// or $("#uv-color").text (uv with indicator color)

// ------------- DISPLAY INFO IN 5 DAY FORECAST ------------

// a for each loop that matches card number to day number ?
// all data come in a variable together or have to insert individual data
