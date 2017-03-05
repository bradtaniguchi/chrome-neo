angular.module('chrome-neo').controller('MainController', MainController);
MainController.$inject=['$log', '$state', '$rootScope'];
function MainController($log, $state, $rootScope) {
  var vm = this;
  var originatorEv; //idk what this does right now..

  vm.openMenu = openMenu;
  vm.currState = $state;//get current state
  vm.go = go;
  vm.refresh = refresh;
  vm.$onInit = onInit;
  return vm;
  /*function definitions*/
  function onInit() {

  }
  function openMenu($mdMenu, ev) {
    originatorEv = ev;
    $mdMenu.open(ev);
  }
  function refresh() {
    $state.reload();
  }
  function go(state) {
    if(vm.currState !== state){
      $state.go(state);
      vm.currState = state;
    }
  }
}
