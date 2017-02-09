angular.module('chrome-neo').controller('MainController', MainController);
MainController.$inject=['$log', '$state', '$rootScope'];
function MainController($log, $state, $rootScope) {
  var vm = this;
  var originatorEv; //idk what this does right now..

  vm.openMenu = openMenu;
  vm.loading = true;
  vm.go = go;
  vm.refresh = refresh;
  vm.$onInit = onInit;
  return vm;
  /*function definitions*/
  function onInit() {
    vm.loading = false;
  }
  function openMenu($mdMenu, ev) {
    $log.log("Clicked");
    originatorEv = ev;
    $mdMenu.open(ev);
  }
  function refresh() {
    $state.reload();
  }
  function go(state) {
    $state.go(state);
  }
}
