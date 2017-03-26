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
  'ChromeService'
];

function InterestingNeoController($log, ChromeService) {
  var vm = this;
  
  vm.jplDetail = jplDetail;
  return vm;
  /*function definitions*/
  function jplDetail(spkid){
    var rawUrl ='http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=';
    $log.log("looking up the given id in browser " + spkid);
    ChromeService.link(rawUrl + spkid);
  }
}