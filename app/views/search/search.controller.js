angular.module('chrome-neo').controller('SearchController', SearchController);
SearchController.$inject = ['$log'];
function SearchController($log) {
  var vm = this;
  vm.query = "";
  vm.search = search;
  return vm;
  /*function definitions*/
  function search(query) {
    $log.log("Searching query..." + query);
    vm.query = ""; //clear the search query
  }
}
