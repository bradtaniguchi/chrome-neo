angular.module('chrome-neo').controller('StatsController', StatsController);
StatsController.$inject = [
  '$log',
  '$mdMenu',
  '$rootScope',
  '$stateParams',
  'queryFields',
  'resolvedStatData'
];

function StatsController($log, $mdMenu, $rootScope, $stateParams, queryFields,
  resolvedStatData) {

  var vm = this;
  vm.data = {};
  vm.id = "";
  vm.dataPointList = [];

  vm.$onInit = onInit();

  return vm;

  /*function definitions*/
  function onInit() {
    vm.id = $stateParams.id;
    vm.data = resolvedStatData; //just get the first item
    $log.log("onInit " + JSON.stringify(vm.data));
    buildList();
  }
  function buildList() {
    $log.log("Datapoint: "+ Object.keys(vm.data));
    //for(var dataPoint in Object.keys(vm.data)) {
    Object.keys(vm.data).forEach(function(dataPoint) {
      $log.log("key: " + dataPoint);

      vm.dataPointList.push({
        "name" : dataPoint, //the name of the datapoint
        "value" : vm.data[dataPoint], //the value of the datapoint in key
        "description" : queryFields[dataPoint] //the description for the key
      });
    });
  }
}
