angular.module('chrome-neo').controller('HomeController', HomeController);
HomeController.$inject = ['$log', '$mdDialog'];
function HomeController($log, $mdDialog) {
  var vm = this;
  vm.showTable = showTable;
  return vm;
  /*function definition*/
  function showTable(event) {
    $mdDialog.show({
      controller: 'TableViewController as vm',
      templateUrl: 'components/table-view/table-view.view.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clockOutsideToClose: true
    });
  }
}
