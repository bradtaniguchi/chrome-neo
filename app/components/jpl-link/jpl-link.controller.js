/**
 * Component that take a single binding, which will transfer the user
 * to JPL's offical page for the given NEO.
 * @type {component}
 */
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
