var inputCity = $("#cityinput");
var searchbtn = $("#searchbtn");
var searchcol = $(".searchcol");
var btnGroup = $(".btn-group-vertical");

var currentDate = moment().format("MM/D/YYYY");
var apiKey = "36dfa1267a90680fd8c48244e2de4540";

// INITIALIZE

// SEARCH FUNCTION
searchbtn.on("click", function(event){
    event.preventDefault();
    
    var city = inputCity.val().trim();
    console.log(city);

    // Won't append a button if empty string
    if(city === ""){
        return false;
    }
    
    
    var newbtn = $("<button>");
    newbtn.attr("id", "savedbtn");
    newbtn.attr("class", "btn btn-secondary");
    newbtn.text(city);
    btnGroup.prepend(newbtn);

    
    // LOCAL STORAGE
    var savedCity = city;
    localStorage.setItem("city-list", savedCity)

    weatherINFO(city);
    daysForecastAPI(city);
    

    // GETS INFO FROM OPENWEATHER
    function weatherINFO(city){
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
           
            $("#uvIndex").html("UV Index: " + uv.value);
            // GREEN = FAIR, ORANGE = MODERATE, RED = SEVERE
            if(uv.value <= 3){
                $("#uvIndex").css("background-color", "green");
            }else if(uv.value >=4 && uv.value <= 8){
                $("#uvIndex").css("background-color", "orange");
            }else{
                $("#uvIndex").css("background-color", "red");
            }
        });

    });
    };   

    // 5DAYFORECAST API
    function daysForecastAPI(city){
    var daysURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=" + apiKey;

    $.ajax({
        url: daysURL,
        method: "GET"
    }).then(function(data){
        // console.log(data);
        // GETS INFO FOR THE NEXT 5 DAYS
        for(let i = 0; i < 6; i++){
            var iconCode = data.list[i].weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/" + iconCode + ".png";

            var tempF = (data.list[i].main.temp - 273.15) * 1.80 +32;


            $(".day" + i).text(moment().add(i, 'days').format("MM/D/YY"));
            $("#icons" + i).html("<img src='" + iconURL + "'alt='icon for weather'>");
            $(".temp" + i).text("Temp (F): " + tempF.toFixed(2));
            $(".humidity" + i).text("Humidity: " + data.list[i].main.humidity + "%");
        }
    });
    };
    // GETS INFO FOR PAST CITIES
    $(document).on("click", "#savedbtn", function() {
        var savedbtn = $(this).text();
        // console.log(savedbtn);

        weatherINFO(savedbtn);
        daysForecastAPI(savedbtn);
    })
    

});


