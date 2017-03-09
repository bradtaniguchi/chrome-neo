angular.module('chrome-neo').controller('StatsController', StatsController);
StatsController.$inject = [
  '$log',
  '$mdMenu',
  '$mdDialog',
  '$state',
  '$rootScope',
  '$stateParams',
  'queryFields',
  'resolvedStatData'
];

function StatsController($log, $mdMenu, $mdDialog, $state, $rootScope,
  $stateParams, queryFields, resolvedStatData) {

  var vm = this;
  vm.data = {};
  vm.valid = true; //default for now
  vm.id = "";
  vm.dataPointList = [];

  vm.openHelp = openHelp;
  vm.$onInit = onInit;

  return vm;

  /*function definitions*/
  function onInit() {
    vm.id = $stateParams.id;
    vm.data = resolvedStatData; //just get the first item
    if(vm.data === undefined) {// its invalid!
      vm.valid = false;
    } else {
      vm.valid = true;
        buildList();
    }
  }

  /**
   * Opens help dialog that shows all known terms to the user
   * @return {undefined}
   */
  function openHelp() {
    $mdDialog.show({
      controller: 'HelpDialogController as vm',
      templateUrl: 'components/help-dialog/help-dialog.view.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    });
  }
  /**
   * Builds the list of dataPoints to display with their description.
   * Applies this to vm.dataPointList
   */
  function buildList() {
    Object.keys(vm.data).forEach(function(dataPoint) {
      vm.dataPointList.push({
        "name" : dataPoint, //the name of the datapoint
        "value" : vm.data[dataPoint], //the value of the datapoint in key
        "description" : queryFields[dataPoint] //the description for the key
      });
    });
  }
}
