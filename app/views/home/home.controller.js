angular.module('chrome-neo').controller('HomeController', HomeController);
HomeController.$inject = [
  '$log',
  '$mdDialog',
  'NeoWsService',
  '$q',
  'moment',
  'constants',
  '$rootScope',
  'CacheService',
  'RankItService'
];
function HomeController($log, $mdDialog, NeoWsService, $q, moment,
  constants, $rootScope, CacheService, RankItService) {
  var vm = this;
  /*Element counts*/
  vm.monthly = 0;
  vm.weekly = 0;
  vm.daily = 0;
  vm.bestNeo = {};
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
        }).catch(handleError);
        /*now we have the weekly data, also get the most ineteresting
        for the week*/
        getBest();
      }).catch(handleError);
    }).catch(handleError);
  }
  /**
   * Wrapper function to handle failed promise requests
   * @param  {[type]} error [description]
   * @return [type]         [description]
   */
  function handleError(error){
    /*stop loading regardless*/
    $rootScope.loading = false;
    var newMessage = 'XHR Failed';
    $log.log("there was an error!");
    $log.log(error);

    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title('Error!')
        .textContent('an error occured: ' + error)
        .ariaLabel('Error')
        .ok('Ok')
    );
    return $q.reject(error);
  }

  function test() {
    getBest();
  }
  /**
   * debug function, that prints the database keys within the database.
   * I don't print out the full JSON size as it gets to large.
   */
  function printDatabase(){
    CacheService.printDatabase();
  }
  /**
   * Debugging utiling to clear the cache.
   */
  function clearCache() {
    CacheService.clear().then(function(){
      $log.log("Cache cleared!");
    }).catch(handleError(err));//clears the cache
  }
  /**
   * Get the daily amount of NEOs. Updates the vm.daily, vm.dailyData with
   * data from the NeowsService.getDaily request.
   * @returns {Promise} returns a promise that will either resolve with nothing
   *                    or returns an error.
   */
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
  /**
   * get weekly requests, this automatically does this for us.
   */
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
  /**
   * Gets the 'best' Neo using the RankItService
   */
  function getBest() {
    var attributes = [
      "estimated_diameter.kilometers.estimated_diameter_min", //could also do max
      "is_potentially_hazardous_asteroid", //true false
      "close_approach_data[0].miss_distance.kilometers", //numbers
      "weight" //i provide this thru the loops
    ];
    var neos = NeoWsService.parseDays(vm.weeklyData.near_earth_objects);

    /*before we sort them, I want to parse only those that are dangerous*/
    var tempNeos = neos.filter(function(neo){
      return neo.is_potentially_hazardous_asteroid;
    });
    /*only filter dangerous if the list is large, otherwise
    don't filter!*/
    if(neos.length !== 0) {
      neos = tempNeos;
    }
    $log.debug("test:");
    $log.debug(neos);
    /*we need to add a base weight of 0 to all of them before sorting*/
    neos.forEach(function(neo){
      neo.weight = 0;
    });
    var tempSorted;
    attributes.forEach(function(attribute){
      RankItService.getSorted(neos, attribute).then(function(sorted){
        /*after each sorted, we need to add to the weight, which equals the size-index*/
        sorted.forEach(function(item, index){
          item.weight += sorted.length - index;
        });
        vm.bestNeo = sorted.pop(); //save the current best value
        $log.debug('sortedBest:');
        $log.debug(vm.bestNeo);
      });
    });
  }
  /*gets the monthly amount*/
  function getMonthly() {
    var differed = $q.defer();
    NeoWsService.getMonthly().then(function(response) {
      vm.monthly = response.element_count;
      vm.monthlyData = response;
      differed.resolve();
    }).catch(function(error){
      getFailedRequest(error);
      differed.resolve();
    });
    return differed.promise;
  }

  /*Handles a http request
  TODO: what does this function even do???*/
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
    showTable(event, data, 'daily');
  }
  function showWeekTable(event, data) {
    showTable(event, data, 'weekly'); //don't give an xAttribute, it will automatically do dates
  }
  function showMonthTable(event, data){
    showTable(event, data, 'monthly');
  }
}
