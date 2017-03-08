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
    url: 'stats/:id',
    resolve : {
      resolvedStatData : resolvedStatData
    },
    parent: 'main',
    templateUrl: 'views/stats/stats.view.html',
    controller: 'StatsController as vm'
  })
  .state('search', {
    url: 'search',
    parent: 'main',
    templateUrl: 'views/search/search.view.html',
    controller: 'SearchController as vm'
  })
  .state('about',{
    url: 'about',
    parent: 'main',
    templateUrl: 'views/about/about.view.html',
    controller: 'AboutController as vm'
  });
  resolvedStatData.$inject = ['$log', '$stateParams', 'AsterankService'];
  function resolvedStatData($log, $stateParams, AsterankService) {
    return AsterankService.getById($stateParams.id, 10);
  }
}
