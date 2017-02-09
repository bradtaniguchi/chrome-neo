angular.module('chrome-neo', [
  'ui.router', //main routing and state handler
  'ngMaterial', //make everything pretty
  'chart.js', //to display the data
  'angularMoment', //to handle times more gracefully
  'LocalForageModule' //local storage api
]);
