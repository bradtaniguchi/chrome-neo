angular.module('chrome-neo').controller('SearchController', SearchController);
SearchController.$inject = [
  '$log',
  '$rootScope',
  'AsterankService'
];
function SearchController($log, $rootScope, AsterankService) {
  var vm = this;
  vm.query = "";
  vm.limits = [5, 10, 25]; //possible query limits
  vm.limit = 10; //default limit
  vm.results = [];

  /*advance options*/
  vm.neosOnly = false;

  vm.search = search;
  vm.$onInit = onInit;

  return vm;
  /*function definitions*/
  function onInit() {
    $rootScope.loading = false; //turn off loading
    /*make some mock fake values, so I dont have to keep searching the API*/
    // vm.results.push({
    //   "full_name": "FAKE NEO",
    //   "spkid": 2000433 //eros spkid
    // });
  }
  /**
   * Searches the Asterank API for the given name using a REGEX
   * @param  {string} query a named that will be searched using a REGEX from
   *                        within the Asterank database.
   */
  function search(query) {
    $log.log("Searching query..." + query);
    vm.query = ""; //clear the search query
    $rootScope.loading = true;
    var queryParams = buildQueryParams();
    AsterankService.getByName(query, vm.limit, queryParams).then(function(response){
      $log.log(response.data);
      vm.results = response.data;
      $rootScope.loading = false;
    }); //error handling.
  }
  /**
   * Utility function that builds the filters from the chosen parameters.
   * Due to the large possibility of filters, I parse and handle them all
   * seperatly
   * @return {Object} an object of filter params to also pass when making
   *                     the http request.
   * @todo Add more
   */
  function buildQueryParams(){
    var queryParams = {};
    if(vm.neosOnly) {
      queryParams.neo = "Y";
    }
  }
}
