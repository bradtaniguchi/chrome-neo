angular.module('chrome-neo').controller('SearchController', SearchController);
SearchController.$inject = [
  '$log',
  '$rootScope',
  'AsterankService',
  '$mdDialog'
];
function SearchController($log, $rootScope, AsterankService, $mdDialog) {
  var vm = this;
  vm.query = "";
  vm.limits = [5, 10, 25]; //possible query limits
  vm.limit = 10; //default limit
  vm.results = [];

  /*advance options*/
  vm.neosOnly = false;

  vm.search = search;
  vm.clear = clear;
  vm.$onInit = onInit;

  return vm;
  /*function definitions*/
  function onInit() {
    $rootScope.loading = false; //turn off loading
  }
  /**
   * Searches the Asterank API for the given name using a REGEX
   * @param  {string} query a named that will be searched using a REGEX from
   *                        within the Asterank database.
   */
  function search(query) {
    if(query !== ""){
      $log.log("Searching query..." + query);
      vm.query = ""; //clear the search query
      $rootScope.loading = true;
      var queryParams = buildQueryParams();
      AsterankService.getByName(query, vm.limit, queryParams).then(function(response){
        $log.log(response.data);
        vm.results = response.data;
        $rootScope.loading = false;
      }).catch(function(err){
        $rootScope.loading = false;
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Error!')
            .textContent('an error occured: ' + err)
            .ariaLabel('Error')
            .ok('Ok')
        );
      }); //error handling.
    }
  }
  /**
   * Clears the search results
   * @return [type] [description]
   */
  function clear() {
    $log.log('clearing results');
    vm.results = [];
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
