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
/**
 * Component that is used to display a single important NEO. This is similar
 * to the neo-basic component, but is used only 1 place in the application and
 * provides slightly different infromation.
 * @class angular_module.InterestingNeoController
 * @name InterestingNeoController
 */
function InterestingNeoController($log, ChromeService, $state) {
  var vm = this;

  vm.stats = stats;
  return vm;
  /*function definitions*/
  /**
   * Changes the state to the stats page, with the spkid.
   * @param  {string} spkid the unique ID of the NEO to pass as a parameter to
   *                        the stats page.
   */
  function stats(spkid) {
    $state.go('stats', {
      id: spkid
    });
  }
}
