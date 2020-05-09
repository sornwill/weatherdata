var inputCity = $("#cityinput");
var searchbtn = $("#searchbtn");
var searchcol = $(".searchcol");


var apiKey = "36dfa1267a90680fd8c48244e2de4540";

// SEARCH FUNCTIONS
searchbtn.on("click", function(event){
    event.preventDefault();
    
    var input = inputCity.val();
    console.log(input);

    if(input === ""){
        return false;
    }
    
    var newbtn = $("<button>");
    newbtn.attr("id", "savedbtn");
    newbtn.text(input);
    searchcol.append(newbtn);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ input + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        console.log(response.weather);
    });


});


