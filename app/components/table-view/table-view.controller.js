/*Table view Controller*/
angular.module('chrome-neo').controller('TableViewController', TableViewController);
TableViewController.$inject=['$log', '$mdDialog', 'constants', 'AsterankService'];

function TableViewController($log, $mdDialog, constants, AsterankService) {
  var vm = this;
  vm.chart = {};
  console.log("In Controller");
  vm.close = close;
  //vm.test = test;
  
  onInit(); //call the function
  return vm;
  
  /*function definitons*/
  function onInit() {
    $log.log("Loading data...");
    /*
    Todo: add a loader service here
    https://api.nasa.gov/api.html#NeoWS
    */
    /*define our chart object*/
    vm.chart = {
      data: [[10,20,30]],
      labels: ["one", "two", "three"],
      options: {
        tooltips: {
          enabled: false
        }
      }
    };
  }
  function close() {
    $mdDialog.hide();
  }
  function test() {
    AsterankService.getById(3726710).then(function(data){
      $log.log(JSON.stringify(data));
    });
  }
}