angular.module('chrome-neo').factory('AsterankService', AsterankService);
AsterankService.$inject= ['$log', '$http', 'constants', 'moment'];
function AsterankService($log, $http, constants, moment) {
  return {
    getById: getById
  };
  /*
  Gets a given asterank request by spkid 
  */
  function getById(id, limit) {
    if (typeof limit !== 'number') {
      limit = 10;
    }
    var config = {
      params: {
        "query": {
          "spkid" : id
        },
        "limit" : limit
      }
    };
    return $http.get(constants.ASTERANK_BASE_URL + config);
  }
}