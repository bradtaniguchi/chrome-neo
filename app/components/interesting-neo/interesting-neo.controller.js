
var interestingNeo = {
  templateUrl:'components/interesting-neo/interesting-neo.view.html',
  controller: 'InterestingNeoController as vm',
  bindings: {
    /*add later*/
  }
};
angular.module('chrome-neo').component('interestingNeo', interestingNeo)
.controller('InterestingNeoController', InterestingNeoController);
InterestingNeoController.$inject=[
  '$log'
];

function InterestingNeoController($log) {
  var vm = this;

  return vm;
}
