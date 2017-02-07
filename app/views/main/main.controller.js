angular.module('chrome-neo').controller('MainController', MainController);
MainController.$inject=['$log', '$http'];
function MainController($log, $http) {
  var vm = this;
  var originatorEv; //idk what this does right now..
  vm.openMenu = openMenu;
  return vm;
  /*function definitions*/
  function openMenu($mdMenu, ev) {
    $log.log("Clicked");
    originatorEv = ev;
    $mdMenu.open(ev);
  }
}
