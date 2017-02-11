angular.module('chrome-neo').factory('NeoWsService', NeoWsService);
NeoWsService.$inject = [];
function NeoWsService() {
  return {
    test: test
  };
  /*function definitions*/
  function test(callback) {
    /*test to see if you can make a connection to the service.*/
    callback(true);
  }
}