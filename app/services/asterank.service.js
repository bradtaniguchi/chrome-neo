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
        $log.debug("Id exists in cache as " + object);
        differed.resolve(object);
      } else { // item doesn't exist in cache
        $log.debug("Key does not exist, calling api...");
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
  /**
   * Query the Asterank api using the simple regex expression.
   * Due to how it is implimented in the back-end, I will be returning multiple
   * different NEOs.
   * @param  {string} name  name of the neo to search the asterank database for.
   *                        This will be used in a REGEX.
   * @param  {number} limit limit of returns to provide.
   * @param  {list} queryParams  List of extra search parameters to narrow the search.
   * @return {promise}       promise from the http request
   */
  function getByName(name, limit, queryParams) {
    if(typeof limit !== 'number') {
      limit = 10;
    }
    if(queryParams === undefined) {
      queryParams = {};
    }
    /*regardless of if I gave params or not, I need to append the full_name
    to the params for the query*/
    queryParams.full_name = {"$regex": name }; //support regex expression search;
    return $http({
      url: constants.ASTERANK_BASE_URL,
      method: 'GET',
      params : {
        query: queryParams,
        limit : limit
      }
    });
  }
}
