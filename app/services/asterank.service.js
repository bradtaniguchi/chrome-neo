angular.module('chrome-neo').factory('AsterankService', AsterankService);
AsterankService.$inject= ['$log', '$http', 'constants', 'moment', '$q', 'CacheService'];
function AsterankService($log, $http, constants, moment, $q, CacheService) {
  return {
    getById: getById,
    getByName: getByName
  };
  /**
   * Gets a given asterank request by spkid
   * @param  {number} id    SPKID of NEO you want to look up
   * @param  {number} limit limit the number to return, this will be generally
   *                        redundant. But is left just in case.
   * @return {Promise}      A promise with the NEO data returned.
   */
  function getById(id, limit) {
    var differed = $q.defer();
    if (typeof limit !== 'number') {
      limit = 10;
    }
    CacheService.checkByID(id).then(function(object){
      if(object !== null) {
        $log.log("Id exists in cache as " + object);
        differed.resolve(object);
      } else { // item doesn't exist in cache
        $log.log("Key does not exist, calling api...");
        $http({
          url: constants.ASTERANK_BASE_URL,
          method: 'GET',
          params: {
            query: {"spkid": Number(id)},
            limit: limit
          }
        }).then(function(response){
          CacheService.setByID(id, response.data[0]); //set the item in the cache.
          differed.resolve(response.data[0]);
        });
      }
    });
    return differed.promise;
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
