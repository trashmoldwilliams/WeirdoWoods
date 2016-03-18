var updateHUD = require('./../js/updateHUD').updateHUD;

$(document).ready(function(){
  currentTime = null;

  function Time(hour, minute, second) {
    this.hour = parseInt(hour);
    this.minute = parseInt(minute);
    this.second = parseInt(second);
    this.totalMinutes = (this.hour * 60) + this.minute;
  }

  var i = setInterval(function() {
    currentTime = new Time(moment().format('HH'), moment().format('mm'), moment().format('ss'));
    updateHUD(currentTime);
    console.log(currentTime);
  }, 1000);
});
