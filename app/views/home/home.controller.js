angular.module('chrome-neo').controller('HomeController', HomeController);
HomeController.$inject = ['$log',
'$mdDialog',
'NeoWsService',
'$q',
'moment',
'constants',
'$rootScope',
'CacheService'];
function HomeController($log, $mdDialog, NeoWsService, $q, moment,
  constants, $rootScope, CacheService) {
  var vm = this;
  /*Element counts*/
  vm.monthly = 0;
  vm.weekly = 0;
  vm.daily = 0;
  /*this is the data to pass to the tables-views*/
  vm.monthlyData = {};
  vm.weeklyData = {};
  vm.dailyData = {};

  vm.todaysDate = "";

  vm.test = test; //test function
  vm.clearCache = clearCache;
  vm.$onInit = onInit;

  vm.getWeekly = getWeekly;
  vm.getDaily = getDaily;
  vm.getMonthly = getMonthly;
  vm.printDatabase = printDatabase;

  /*Table show functions*/
  vm.showDayTable = showDayTable;
  vm.showWeekTable = showWeekTable;
  vm.showMonthTable = showMonthTable;

  return vm;
  /*function definition*/
  function onInit() {
    vm.monthly = 0; //for now
    vm.daily = 0; //for now
    vm.todaysDate = moment().format(constants.MOMENT_FORMAT);
    $rootScope.loading = true; // show the loading bar until we get all data
    getDaily().then(function(){
      getWeekly().then(function(){
        getMonthly().then(function(){
          $log.log("loading done");
          $rootScope.loading = false;
        });
      });
    });

  }
  function test() {
    /*nice!*/
    //$log.log("Test: " + moment().week(week-1).startOf('week').format(constants.MOMENT_FORMAT));
    getMonthly();
  }
  function printDatabase(){
    CacheService.printDatabase();
  }
  /**
   * Debugging utiling
   * @return {[type]} [description]
   */
  function clearCache() {
    CacheService.clear().then(function(){
      $log.log("Cache cleared!");
    });//clears the cache
  }
  /*get daily amounts*/
  function getDaily() {
    var differed = $q.defer();
    NeoWsService.getDaily().then(function(response) {
      vm.daily = response.element_count;
      vm.dailyData = response;
      differed.resolve();
    }).catch(function(error){
      getFailedRequest(error);
      differed.resolve();
    });
    return differed.promise;
  }
  /*get weekly requests, this automatically does this for us.*/
  function getWeekly() {//2015-09-07
    var differed = $q.defer();
    NeoWsService.getWeekly().then(function(response) {
      vm.weekly = response.element_count;
      vm.weeklyData = response;
      differed.resolve();
    }).catch(function(error){
      getFailedRequest(error);
      differed.resolve();
    });
    return differed.promise;
  }
  /*gets the monthly amount*/
  function getMonthly() {
    var differed = $q.defer();
    NeoWsService.getMonthly().then(function(response) {
      vm.monthly = response.element_count;
      vm.monthlyData = response.near_earth_objects;
      differed.resolve();
    }).catch(function(error){
      getFailedRequest(error);
      differed.resolve();
    });
    return differed.promise;
  }

  /*Handles a http request*/
  function getFailedRequest(error) {
    var newMessage = 'XHR Failed';
    if (error.data && error.data.description) {
      newMessage = newMessage + '\n' + error.data.description;
    }
    error.data.description = newMessage;
    $log.error(newMessage);
    return $q.reject(error);
  }
  function showTable(event, data, xAttribute) {
    $mdDialog.show({
      locals: {
        initData : {
          data: data,
          xAttribute: xAttribute
        },
      },
      controller: 'TableViewController as vm',
      templateUrl: 'components/table-view/table-view.view.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clockOutsideToClose: true
    });
  }
  function showDayTable(event, data){
    showTable(event, data, 'TEMP ATTRIBUTE');
  }
  function showWeekTable(event, data) {
    showTable(event, data); //don't give an xAttribute, it will automatically do dates
  }
  function showMonthTable(event, data){
    showTable(event, data, 'monthly');
  }
}
