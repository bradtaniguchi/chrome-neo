/*Table view Controller*/
angular.module('chrome-neo').controller('TableViewController', TableViewController);
TableViewController.$inject=['$log', '$mdDialog', 'constants', 'AsterankService'];

function TableViewController($log, $mdDialog, constants, AsterankService) {
  var vm = this;
  vm.close = close;
  vm.test = test;
  
  return vm;
  
  /*function definitons*/
  function close() {
    $mdDialog.hide();
  }
  function test() {
    AsterankService.getById(3726710).then(function(data){
      $log.log(JSON.stringify(data));
    });
  }
}