angular.module('chrome-neo').factory('AsterankService', AsterankService);
AsterankService.$inject= ['$log', '$http', 'constants', 'moment'];
function AsterankService($log, $http, constants, moment) {
  return {
    getById: getById,
    getByName: getByName
  };
  /*
  Gets a given asterank request by spkid
  */
  function getById(id, limit) {
    if (typeof limit !== 'number') {
      limit = 10;
    }
    return $http({
      url: constants.ASTERANK_BASE_URL,
      method: 'GET',
      params: {
        query: {"spkid": id},
        limit: limit
      }
    });
  }
  function getByName(name, limit) {
    if(typeof limit !== 'number') {
      limit = 10;
    }
    return $http({
      url: constants.ASTERANK_BASE_URL,
      method: 'GET',
      params : {
        query:{"full_name": name},
        limit : limit
      }
    });
  }
}
