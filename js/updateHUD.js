var removeClasses = require('./../js/removeClasses').removeClasses;

exports.updateHUD = function(currentTime){
  var totalMinutes = currentTime.totalMinutes;
  // var totalMinutes = 389;
  var sunrise = 420;
  var sunset = 1140;

  if(totalMinutes > (sunrise) && totalMinutes < (sunset - 30)) {
    removeClasses();
    $("body").addClass("day");
  } else if((totalMinutes >= (sunrise - 30) && totalMinutes <= (sunrise)) || (totalMinutes >= (sunset - 30) && totalMinutes <= (sunset))) {
    removeClasses();
    $("body").addClass("twilight");
  } else if(totalMinutes > (sunset) || totalMinutes < (sunrise - 30)) {
    removeClasses();
    $("body").addClass("night");
  }
};
