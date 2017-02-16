angular.module('chrome-neo').controller('HomeController', HomeController);
HomeController.$inject = ['$log',
'$mdDialog',
'NeoWsService',
'$q',
'moment',
'constants'];
function HomeController($log, $mdDialog, NeoWsService, $q, moment, constants) {
  var vm = this;
  vm.loading = true;
  vm.monthly = 0;
  vm.weekly = 0;
  vm.daily = 0;
  vm.todaysDate = "";

  vm.showTable = showTable;
  vm.$onInit = onInit;
  vm.getWeekly = getWeekly;
  vm.getDaily = getDaily;

  return vm;
  /*function definition*/
  function onInit() {
    vm.loading = false;
    vm.monthly = 0; //for now
    vm.daily = 0; //for now
    vm.todaysDate = moment().format(constants.MOMENT_FORMAT);
    getWeekly();
    getDaily();
  }
  /*get weekly requests, this automatically does this for us.*/
  function getWeekly() {//2015-09-07
    //console.log(moment().format('YYYY-MM-DD'));
    /*NeoWsService.getWeekly().then(function(response) {
      vm.weekly = response.data.element_count;
    }).catch(getFailedRequest);*/
  }
  /*get daily amounts*/
  function getDaily() {
      /*NeoWsService.getDaily().then(function(response) {
        vm.daily = response.data.element_count;
      }).catch(getFailedRequest);*/
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
