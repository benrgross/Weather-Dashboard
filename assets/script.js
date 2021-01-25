// --- RetRETRIEVE WEATHER INFO ----
// --- use api to retrieve info and store them in variables ?

// ----- SIDE NAV  ------

// -- load previous cities searched from local storage

// -- connect to #search button with click/submit event

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

//My api key
var APIKey = "b833b868df96016cabebdb7a4ca15977";

// Here we are building the URL we need to query the database
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" +
  APIKey;

// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  // Create CODE HERE to Log the queryURL
  // Create CODE HERE to log the resulting object
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  // Create CODE HERE to transfer content to HTML
  // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
  // Create CODE HERE to dump the temperature content into HTML
});
