angular.module('chrome-neo', [
  'ui.router', //main routing and state handler
  'ngMaterial', //make everything pretty
  'ngAnimate', //animate all the things
  'chart.js', //to display the data
  'angularMoment', //to handle times more gracefully
  'LocalForageModule' //local storage api
]).run(block);

block.$inject = ['$log', '$rootScope'];
function block($log, $rootScope){
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    $rootScope.loading = true;
  });
  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
    $rootScope.loading = false;
  });
  $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
    $log.log("An error occured changing states. " + error);
    $rootScope.loading = false;
  });
}
