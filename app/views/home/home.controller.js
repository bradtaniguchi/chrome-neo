angular.module('chrome-neo').controller('HomeController', HomeController);
HomeController.$inject = ['$log', '$mdDialog', 'NeoWsService', '$q'];

function HomeController($log, $mdDialog, NeoWsService, $q) {
  var vm = this;
  vm.loading = true;
  vm.showTable = showTable;
  vm.$onInit = onInit;

  return vm;
  /*function definition*/
  function onInit() {
    vm.loading = false;
    vm.monthly = 0; //for now
    vm.weekly = 0;
    NeoWsService.getWeekly().then(function(response) {
      vm.weekly = response.data.element_count;
    }).catch(getFailedRequest);
    vm.daily = 0; //for now
  }
  /*Handles a http request*/
  function getFailedRequest(error) {
    var newMessage = 'XHR Failed for getCustomer';
    if (error.data && error.data.description) {
      newMessage = newMessage + '\n' + error.data.description;
    }
    error.data.description = newMessage;
    $log.error(newMessage);
    return $q.reject(error);
  }

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
