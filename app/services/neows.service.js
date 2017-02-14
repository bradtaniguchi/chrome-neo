angular.module('chrome-neo').factory('NeoWsService', NeoWsService);
NeoWsService.$inject = ['$log', '$http', 'constants'];
function NeoWsService($log, $http, constants) {
  var key;
  return {
    test: test,
    getWeekly : getWeekly
  };
  /*function definitions*/
  function test(callback) {
    /*test to see if you can make a connection to the service.*/
    callback(true);
  }
  function getWeekly() {
    return $http({
      url: constants.NEOWS_BASE_URL,
      method: 'GET',
      params: {
        api_key : 'DEMO_KEY' //don't use the DEMO key too much!
      }
    });
  }
}