angular.module('chrome-neo').controller('StatsController', StatsController);
StatsController.$inject = [
  '$log',
  'AsterankService',
  '$mdMenu',
  '$mdDialog',
  'queryFields',
  '$rootScope',
  'resolvedStatData'
];

function StatsController($log, AsterankService, $mdMenu, $mdDialog,
  queryFields,$rootScope, resolvedStatData) {
  var vm = this;
  var originatorEv;
  /*This is for the datapoint filter options*/
  vm.menuOptions = Object.keys(queryFields);
  vm.newFilter= ""; //the currently selected filter view
  vm.newValue = "";// the currently entered value
  vm.datapointAmount = 10; //how much data do we want to return
  vm.datapointAmounts = [10, 25, 50, 100]; //list of options on how much data we want to return

  /*list of all the filters in the view*/
  vm.filters = [];

  /*This is for days of the week*/
  vm.lineLabels = ['Monday', 'Tuesday', 'Wednesday'];
  vm.lineSeries = ['NEOs'];
  /*NEOs per day*/
  vm.lineData=[
    [20,30,40]
  ];
  vm.options={};

  vm.data = {};

  vm.getNeos = getNeos;
  vm.changeStat = changeStat;
  vm.openMenu = openMenu;
  vm.openHelp = openHelp;
  vm.addFilter = addFilter;
  vm.removeFilter = removeFilter;
  vm.$onInit = onInit;

  return vm;
  /*function defintions*/
  function onInit() {
    $rootScope.loading = false; //turn off loading
    //vm.data = resolvedStatData.data;
  }
  /**
   * Open menu handler, opens the menu of filter options
   * @param  {[type]} $mdMenu [description]
   * @param  {[type]} ev      [description]
   * @return {[type]}         [description]
   */
  function openMenu($mdMenu, ev) {
    $log.log("Clicked");
    originatorEv = ev;
    $mdMenu.open(ev);
  }
  /**
   * Opens the $mdDialog help menu for obital mechanics definitions
   */
  function openHelp() {
    $log.log("Opening dialog...");
    $mdDialog.show({
      controller: 'HelpDialogController as vm',
      templateUrl: 'components/help-dialog/help-dialog.view.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    });
  }
  /**
   * Adds a new filter to the filter list, with the given name
   * @param {string} filterName name of the filter to apply, this will actually
   * be parsed by the Asterank service, so it MUST be a valid field
   * @param {string} filterValue value for the given filter, this will actually
   * be parsed by the Asterank service, so it MUST be a valid field
   */
  function addFilter(filterName, filterValue) {
    /*first make sure the filters are filled..*/
    if(filterName !== "" && filterValue !== ""){
      /*adding filter..*/
      $log.log("Adding filter ");

      vm.filters.push({
        "filterName": filterName,
        "filterValue": filterValue
      });
      vm.newFilter = "";
      vm.newValue = "";
    }
  }
  /**
   * Removes the given filter at the index from the vm.filters list
   * @param  {string} index the index of the filter to remove
   */
  function removeFilter(index) {
    vm.filters.splice(index, 1);
  }
  /**
   * Changes the chart type to the new settings
   * @return {[type]} [description]
   */
  function changeStat() {
    $log.log("changing stat view");
    return [];
  }
  /**
   * Gets the data points from the API endpoint
   * TODO: Work from here
   */
  function getNeos() {
    return [];
  }
}
