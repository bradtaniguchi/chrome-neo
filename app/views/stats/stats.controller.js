angular.module('chrome-neo').controller('StatsController', StatsController);
StatsController.$inject = ['$log'];

function StatsController() {
  var vm = this;
  vm.data = [100,300,200];
  return vm;
}
