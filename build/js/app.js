(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
exports.removeClasses = function(){
  $("body").removeClass("day");
  $("body").removeClass("twilight");
  $("body").removeClass("night");
};

},{}],3:[function(require,module,exports){
var removeClasses = require('./../js/removeClasses').removeClasses;

exports.updateHUD = function(currentTime){
  var totalMinutes = currentTime.totalMinutes;
  // var totalMinutes = 500;
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

},{"./../js/removeClasses":2}],4:[function(require,module,exports){
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

},{"./../js/findWeather":1,"./../js/updateHUD":3}]},{},[4]);
