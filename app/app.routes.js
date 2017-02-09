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
    templateUrl: 'views/home/home.view.html',
    controller: 'HomeController as vm'
  })
  .state('stats', {
    url: 'stats',
    parent: 'main',
    template: 'stats template'
  })
  .state('search', {
    url: 'search',
    parent: 'main',
    template: 'search template'
  })
  .state('about',{
    url: 'about',
    parent: 'main',
    template: 'about template'
  });
}
