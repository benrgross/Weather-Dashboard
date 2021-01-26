// --- RetRETRIEVE WEATHER INFO ----
moment().format("L");

// We then created an AJAX call
var APIKey = "b833b868df96016cabebdb7a4ca15977";
var storeCity = JSON.parse(localStorage.getItem("cities")) || [];

function singleDay(chosenCity) {
  // Here we are building the URL we need to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    chosenCity +
    "&appid=" +
    APIKey;
  // ajax call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // add searched city to search result element
    var addCity = $("<li>");
    addCity.text(response.name).attr("class", "list-group-item");
    $(".city").append(addCity);

    // store city local storage
    storeCity.push(response.name);
    localStorage.setItem("cities", JSON.stringify(storeCity));

    // ----------------- Add Current Weather Data to Page ------------------

    // City and Date ----------------
    currentDate = moment().format("L");
    $("#current-date").text(response.name + " " + currentDate);
    // Temperature -----------------
    tempKelvin = response.main.temp;
    temp = Math.round((Number(tempKelvin) - 273.15) * 1.8 + 32);
    $("#temp").text("Temperature :" + temp + "°F");
    console.log("temp", temp);

    // Humidity ------------------
    $("#hum").text("Humidity: " + response.main.humidity + " %");

    // Wind ------------------------
    $("#wind").text("Wind Speed: " + response.wind.speed + " mph");

    //UV---------------
  });
}

// load previously searched cities from local storage
function getCities() {
  for (i = 0; i < storeCity.length; i++) {
    var addCity = $("<button>");
    addCity.text(storeCity[i]).attr("class", "list-group-item");
    $(".city").append(addCity);
  }
}

getCities();

// --------------- Button Events --------------------
// When search button clicked, find city and retrieve info from API
$(".btn").click(function (event) {
  event.preventDefault();

  chosenCity = $(this).parent().find("#search").val();
  console.log("chosen city", chosenCity);

  singleDay(chosenCity);
});

// Select city from list ----------------

$(".list-group-item").click(function () {
  chosenCity = $(this).text();
  console.log("list city", chosenCity);
});

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
