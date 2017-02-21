angular.module('chrome-neo').controller('StatsController', StatsController);
StatsController.$inject = ['$log', 'AsterankService', '$mdMenu'];

function StatsController($log, AsterankService, $mdMenu) {
  var vm = this;
  var originatorEv;
  
  /*This is for days of the week*/
  vm.lineLabels = ['Monday', 'Tuesday', 'Wednesday'];
  vm.lineSeries = ['NEOs'];
  /*NEOs per day*/
  vm.lineData=[
    [20,30,40]
  ];
  vm.options={};
  
  vm.getNeos = getNeos;
  vm.changeStat = changeStat;
  vm.openMenu = vm.openMenu;
  
  return vm;
  /*function defintions*/
  function openMenu($mdMenu, ev) {
    $log.log("Clicked");
    originatorEv = ev;
    $mdMenu.open(ev);
  }
  
  function changeStat() {
    return [];
  }
  /*
  gets the amount of neos for the week, returns a list of 
  */
  function getNeos() {
    
    return [];
  }
}
