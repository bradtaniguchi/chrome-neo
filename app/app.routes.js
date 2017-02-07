/*include the router config into the angularjs app*/
angular.module('chrome-neo').config(router);
router.$inject = ['$stateProvider', '$urlRouterProvider'];
function router($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('main',{
    url: '/',
    abstract: '',
    templateUrl: 'views/main/main.view.html',
    controller: 'MainController as vm'
  })
  .state('home',{
    url: 'home',
    parent: 'main',
    template: 'THIS IS MAIN',
    controller: 'HomeController as vm'
  });
  /*.state('stats',{})
  .state('search',{})
  .state('about',{});*/
}
