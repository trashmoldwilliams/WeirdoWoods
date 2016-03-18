exports.findWeather = function(){
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&cnt=10&appid=c7adaab3f10da30791ccdeeee0c3d029',function(result) {
      var weatherEffects = [];
      for(var i = 0; i < result.weather.length; i++) {
        weatherEffects.push(result.weather[0].id);
      }

      var temperature = parseInt(result.main.temp) - 273.15;
      
      var sunriseDate = new Date(result.sys.sunrise * 1000);
      var sunrise = (sunriseDate.getHours() * 60) + sunriseDate.getMinutes();
      var sunsetDate = new Date(result.sys.sunset * 1000);
      var sunset = (sunsetDate.getHours() * 60) + sunsetDate.getMinutes();

      console.log("temperature: " + temperature.toFixed(0) + " C");
      console.log("weather effects: " + weatherEffects);
      console.log("sunrise: " + sunrise);
      console.log("sunset: " + sunset);
    });
  });
};
