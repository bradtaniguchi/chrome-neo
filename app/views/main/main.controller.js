angular.module('chrome-neo').controller('MainController', MainController);
MainController.$inject=[
  '$log',
  '$state',
  '$rootScope',
  '$document',
  '$timeout'
];
/**
 * @class angular_module.MainController
 * @name MainController
 * @description controller for the main view, which all other views inherit from.
 *
 */
function MainController($log, $state, $rootScope, $document, $timeout) {
  var vm = this;
  vm.showMenu = false;

  vm.openMenu = openMenu;
  vm.currState = $state;//get current state
  vm.go = go;
  vm.refresh = refresh;
  vm.$onInit = onInit;
  return vm;
  /*function definitions*/
  function onInit() {

  }
  /**
   * Opens the menu to display the available choices to provide a
   * small and basic navbar.
   */
  function openMenu() {
    vm.showMenu=!vm.showMenu;
  }
  function closeMenu() {
    vm.showMenu = false;
  }
  /**
   * Refreshes the current state
   */
  function refresh() {
    $log.debug('refreshing');
    $state.reload();
  }
  /**
   * Transfers to the given state
   * @param {string} state name of the state to transfer to
   */
  function go(state) {
    // if(vm.currState !== state){
    //   $state.go(state);
    //   vm.currState = state;
    // }
    $state.go(state);
    vm.showMenu = false;
  }
}
