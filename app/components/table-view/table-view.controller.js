/*Table view Controller*/
angular.module('chrome-neo').controller('TableViewController', TableViewController);
TableViewController.$inject=['$log', 'constants'];

function TableViewController($log, constants) {
  var vm = this;
  console.log("test" + constants.test);
  return vm;
}