var updateHUD = require('./../js/updateHUD').updateHUD;
var findWeather = require('./../js/findWeather').findWeather;

$(document).ready(function(){
  currentTime = null;
  currentWeather = null;

  function Time(hour, minute) {
    this.hour = parseInt(hour);
    this.minute = parseInt(minute);
    this.totalMinutes = (this.hour * 60) + this.minute;
  }

  updateInfo = function() {
    currentWeather = findWeather();
    currentTime = new Time(moment().format('HH'), moment().format('mm'));
    updateHUD(currentTime);

  }

  updateInfo();
  console.log(currentTime);
  console.log(currentWeather);
  var i = setInterval(updateInfo, 30000);
});
