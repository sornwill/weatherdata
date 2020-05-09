var inputCity = $("#cityinput");
var searchbtn = $("#searchbtn");
var searchcol = $(".searchcol");

var currentDate = moment().format("MM/D/YYYY");

var apiKey = "36dfa1267a90680fd8c48244e2de4540";

// SEARCH FUNCTION
searchbtn.on("click", function(event){
    event.preventDefault();
    
    var city = inputCity.val();
    console.log(city);

    // Won't append a button if empty string
    if(city === ""){
        return false;
    }
    
    var newbtn = $("<button>");
    newbtn.attr("id", "savedbtn");
    newbtn.text(city);
    searchcol.append(newbtn);

    // GETS INFO TO WEATHER 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(queryURL);
        // console.log(response)
        // console.log(response.weather);
        // console.log(response.weather[0].icon);

        // gets icon code
        var iconCode = response.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";

        $("#cityname").html(response.name + " " + currentDate + " " + "<img src='" + iconURL +"' alt='icon for current weather'>");

        var tempF = (response.main.temp - 273.15) * 1.80 +32;
        $("#temp").text("Temp (F): " + tempF.toFixed(2));
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windspd").text("Wind Speeds: " + response.wind.speed + " MPH");

        //UV API
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey +"&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
        // console.log(uvURL);

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(uv) {
            // console.log(uv);
            $("#uv").text("UV Index: " + uv.value);
        });

    });

    // 5DAY API
    var daysURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=" + apiKey;

    $.ajax({
        url: daysURL,
        method: "GET"
    }).then(function(data){
        console.log(data);
    });

    
});


