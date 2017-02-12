/*Table view Controller*/
angular.module('chrome-neo').controller('TableViewController', TableViewController);
TableViewController.$inject=['$log', '$mdDialog', 'constants'];

function TableViewController($log, $mdDialog, constants) {
  var vm = this;
  vm.close = close;
  
  return vm;
  
  /*function definitons*/
  function close() {
    $mdDialog.hide();
  }
}