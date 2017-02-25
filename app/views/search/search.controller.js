angular.module('chrome-neo').controller('SearchController', SearchController);
SearchController.$inject = ['$log', '$rootScope'];
function SearchController($log, $rootScope) {
  var vm = this;
  vm.query = "";
  vm.search = search;
  vm.$onInit = onInit;
  return vm;
  /*function definitions*/
  function onInit() {
    $rootScope.loading = false; //turn off loading
  }
  function search(query) {
    $log.log("Searching query..." + query);
    vm.query = ""; //clear the search query
  }
}
