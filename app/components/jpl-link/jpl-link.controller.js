var jplLink = {
  templateUrl: 'components/jpl-link/jpl-link.view.html',
  controller: 'JplLinkController as vm',
  bindings: {
    spkid: '<'
  }
};
angular.module('chrome-neo').component('jplLink', jplLink)
.controller("JplLinkController", JplLinkController);

JplLinkController.$inject=['$log','ChromeService'];
/**
 * Component that takes a single binding, spkid, and provides a button that the
 * user can click on to get transfered to the offical JPL page for that given NEO.
 * @class angular_module.JplLinkController
 * @name JplLinkController
 */
function JplLinkController($log, ChromeService) {
  var vm = this;

  vm.lookup = lookup;
  return vm;
  /*function defnitions*/
  /**
   * Opens the offical JPL page using ChromeSerivce.
   * @param  {number} spkid id of the neo to lookup on jpls website
   */
  function lookup(){
    var rawUrl ='http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=';
    $log.debug("looking up the given id in browser " + vm.spkid);
    ChromeService.link(rawUrl + vm.spkid);
  }
}
