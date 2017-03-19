var neoBasic = {
  templateUrl: 'components/neo-basic/neo-basic.view.html',
  controller: 'NeoBasicController as vm',
  bindings: {
    neo: '<' //neo is the object we want to get datafrom.
  }
};
angular.module('chrome-neo').component('neoBasic', neoBasic)
.controller('NeoBasicController', NeoBasicController);

/*function definition*/
NeoBasicController.$inject=[
  '$log',
  '$state',
  '$stateParams',
  '$window'
];

function NeoBasicController($log, $state, $stateParams, $window) {
  var vm = this;
  //vm.$onInit = onInit;
  vm.fullDetail = fullDetail;
  return vm;
  /*function definitions*/
  function onInit() {
    //console.log(vm.neo);
  }

  /**
   * Takes the user to the Stat view, from the given SPKID. To save on the
   * extra HTTP request, I cache the data I already have from the Asterank
   * service.
   * @param  {number} id the spkid number given by nasa, that is unique. This
   *                     is required by the AsterankService to get all the data
   *                     for a single NEO.
   * @todo Add the cache by ID entry here. That way I make only 1 http request
   * call to the API service.
   */
  function fullDetail(id) {
    /*add cache by ID entry here with the given data.*/
    $log.log("Looking up the given id:" + id);
    $window.scrollTo(0, 0); //move view to the top of the page while we load..
    /*change state regardless?*/
    $state.go('stats',{
      id:id
    });
  }
  /**
   * Opens the JPL info link in the browser
   * @param  {number} spkid the spkid number given by nasa, this is unique. The
   *                        reference link for JPL is
   */
  function jplDetail(spkid){
    $log.log("looking up the given id in browser " + id);
  }
}
