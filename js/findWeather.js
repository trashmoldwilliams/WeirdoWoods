exports.findWeather = function(){
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude, position.coords.longitude);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&cnt=10&appid=c7adaab3f10da30791ccdeeee0c3d029',function(result) {
      var weatherEffects = [];
      for(var i = 0; i < result.weather.length; i++) {
        weatherEffects.push(result.weather[0].id)
      }

      var temperature = parseInt(result.main.temp) - 273.15;
      var sunrise = result.sys.sunrise;
      var sunset = result.sys.sunset;
      console.log(result);
      console.log(temperature);
      console.log(weatherEffects);
      console.log("sunrise: " + sunrise);
      console.log("sunset: " + sunset);
    });
  });
};
