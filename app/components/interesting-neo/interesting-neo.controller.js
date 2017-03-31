var interestingNeo = {
  templateUrl:'components/interesting-neo/interesting-neo.view.html',
  controller: 'InterestingNeoController as vm',
  bindings: {
    neo : '<'
  }
};
angular.module('chrome-neo').component('interestingNeo', interestingNeo)
.controller('InterestingNeoController', InterestingNeoController);
InterestingNeoController.$inject=[
  '$log',
  'ChromeService',
  '$state'
];

function InterestingNeoController($log, ChromeService, $state) {
  var vm = this;

  vm.stats = stats;
  return vm;
  /*function definitions*/

  function stats(spkid) {
    $state.go('stats', {
      id: spkid
    });
  }
}
