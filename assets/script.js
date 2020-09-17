// Storage History Data

var historyData = []


// Get Current Weather

function displayCurrentWeather (){

    var cityName = $("input").val()
        var currentQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=166a433c57516f51dfab1f7edaed8413"
        
                           
        $.ajax({
          url: currentQueryURL,
          method: "GET"
        }).then(function(response) {
            $("#current-weather").text("")
            var currentDay = moment().format("(YYYY/MM/DD)")
            var currentCity = $("<div>").text(cityName + " " + currentDay)
            var humidity = response.main.humidity
            var temp = response.main.temp
            var windSpeed = response.wind.speed
            var tempConvert = (temp - 273.15) * 1.80 + 32
            var currentTemp = $("<div>").text("Temperture: " + parseInt(tempConvert) + "°F")
            var currentHumidity = $("<div>").text("Humidity: " + humidity + "%")
            var currentWindSpeed = $("<div>").text("Wind Speed: " + windSpeed + "MPH")
            

            $("#current-weather").append(currentCity, currentTemp ,currentHumidity, currentWindSpeed)
            currentCity.addClass("title")
            var storageCurrentData = {
                city: currentCity.text(),
                temp: currentTemp.text(),
                humidity: currentHumidity.text(),
                wind: currentWindSpeed.text(),

            };

            localStorage.setItem("current-data", JSON.stringify(storageCurrentData));
      });
}

    // Get Forecast Info
        function displayForecastCard (){

        var cityName = $("input").val()
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" +
          cityName + "&appid=166a433c57516f51dfab1f7edaed8413";
        
                           
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

            $("#forecast-module").text("")

            
            // Loop for 5 days
            for(var i=0; i<response.list.length; i+=8){
            var futureDate = response.list[i].dt_txt
            var dateOnly = futureDate.substr(0,10)
            var futureTemp = response.list[i].main.temp
            var tempConvert = (futureTemp - 273.15) * 1.80 + 32
            var currentHumidity = response.list[i].main.humidity

            var forecastModule = $("<div>").html(dateOnly  + ("</br>Temp: " + parseInt(tempConvert)  + "°F") + ( "</br>Humidity: " + currentHumidity + "%"))
            forecastModule.addClass("forecast")
            forecastModule.attr("id", "forecast-module"+i)
            $("#forecast-module").append(forecastModule)

            var storageForecastData = {
                date: dateOnly,
                temp: tempConvert,
                humidity: currentHumidity,

            }

            localStorage.setItem("forecast-module"+i, $("#forecast-module"+i).text())
        }
  
      });

    }

    // Append City Name to History
    function displayHistory () {
        var cityHistory = $("<div>").text($("input").val())
        cityHistory.addClass("history-title")
        cityHistory.attr("value", cityHistory)
            
        $("#search-history").append(cityHistory)
        
        historyData.push(cityHistory.text())
       console.log(historyData)
       storeHistoryCityName()

       }
    //    Storage City Name
    function storeHistoryCityName() {
        localStorage.setItem("history-search-city-name", JSON.stringify(historyData))

    }
    

    
    // When Search Clicked
    
       $(function(){
        $("button").click(function(){
            displayCurrentWeather();
            displayForecastCard();
            displayHistory();
            storeHistoryCityName()
            
        })

       })

    // When Click on Search History 
  
       

    


    // When Refresh Page

    function renderHistroy () {

        // Render Search History
        
        var storeCityHistory = JSON.parse(localStorage.getItem("history-search-city-name"));
       

            if (storeCityHistory !== null){
                historyData=storeCityHistory
                
            }
            
            for (var i =0; i < storeCityHistory.length; i++){
           var cityHistory = $("<div>").text(storeCityHistory[i]);
            $("#search-history").append(cityHistory)
            cityHistory.addClass("history-title")
        
       
        }

        // Render Current Weather
        var getStoragedCurrentWeather = JSON.parse(localStorage.getItem("current-data"))
        var currentDay = moment().format("(YYYY/MM/DD)")
            var currentCity = $("<div>").text(getStoragedCurrentWeather.city)
            var humidity = getStoragedCurrentWeather.humidity
            var temp = getStoragedCurrentWeather.temp
            var windSpeed = getStoragedCurrentWeather.wind
            
            var currentTemp = $("<div>").text(temp)
            var currentHumidity = $("<div>").text(humidity)
            var currentWindSpeed = $("<div>").text(windSpeed)
        $("#current-weather").append(currentCity, currentTemp ,currentHumidity, currentWindSpeed)
            currentCity.addClass("title")
       
        // Render Forecast 
        for ( var i =0; i<33; i+=8){
            var getForecastStorageData = localStorage.getItem("forecast-module"+i)
        var forecastModule = $("<div>").text(getForecastStorageData)
            forecastModule.addClass("forecast")
            forecastModule.attr("id", "forecast-module"+i)
            $("#forecast-module").append(forecastModule)


        }
        

        
    }
    
    
    renderHistroy ()