/*include the router config into the angularjs app*/
angular.module('chrome-neo').config(router);
router.$inject = ['$stateProvider', '$urlRouterProvider'];
function router($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('main',{
    url: '/',
    templateUrl: 'views/main/main.view.html'
  });
}
