angular.module('chrome-neo').factory('RankItService', RankItService);
RankItService.$inject = [
  '$log',
  '$q'
];
function RankItService($log, $q) {
  return {
    getBest : getBest,
    getSorted : getSorted,
    getWorst: getWorst,
    /*these functions below are public for testing purposes.*/
    merge_sort: merge_sort,
    merge: merge,
    filterDangerous : filterDangerous
  };
  /**
   * Gets the Most interesting NEO in the given list, or it gets the LARGESET
   * of the given set.
   * @param  {array} neos list of days with neos in them
   * @return {promise} promise that will resolve to the best Neo, or none
   */
  function getBest(neos, attr) {
    var differed =  $q.defer();
    if(!neos.length) { //if the neos array is empty, return nothing
      differed.resolve({});
    } else {
      var best = merge_sort(neos, attr).pop();
      differed.resolve(best); //TOOD: actually do the logic!
    }
    return differed.promise;
  }
  /**
   * Sorts the NEOs from most interesting to least interesting
   * @param  {array} neos list of days with neos in them
   * @return {promise}      promise with the first argument as the ordered list
   *                                of NEOs
   */
  function getSorted(neos) {
    var differed =  $q.defer();
    if(!neos.length) {
      differed.resolve([]);
    } else {
      differed.resolve([]);
    }
    return differed.promise;
  }
  /**
   * Gets the least interesting NEO from the given list
   * @param  {array} neos list of days with neos in them
   * @return {promise}      promise with the first argument as the worst single NEO
   */
  function getWorst(neos) {
    var differed =  $q.defer();
    differed.resolve({});
    return differed.promise;
  }
  /**
   * Utility function that returns the ordered an ordered list in n log n time.
   * Orders them from SMALLEEST TO LARGEST
   * @param  {array} neos list of neos to sort
   * @param  {string} attr attribute to sort the list by
   * @return {promise}      promise with the first argument as the sorted list
   */
  function merge_sort(neos, attr) {
    /*base case*/
    if (neos.length <= 1) {
      return neos;
    }
    var left = [];
    var right = [];
    neos.forEach(function(neo, index, array){
      if (index < (neos.length/2)) {
        left.push(neo);
      }
      else {
        right.push(neo);
      }
    });
    left = merge_sort(left, attr);
    right = merge_sort(right, attr);

    return merge(left, right, attr);
  }
  /**
   * Second utility sorting function, that takes 2 sublists, and combines them.
   * Orders them from SMALLEST to LARGEST
   * @return {array} an array of neos in order of attribute.
   */
  function merge(left, right, attr){
    var result = [];
    /*see if one doesn't exit*/
    if(left === undefined){
      left = [];
    }
    if(right === undefined) {
      right = [];
    }
    while (left.length && right.length) { //while the two lists aren't empty
      if(left[0][attr] <= right[0][attr]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    while(left.length) result.push(left.shift());
    while(right.length) result.push(right.shift());

    return result;
  }
  /**
   * Given a parsed list of neos, this function returns only those that have
   * the 'dangerous' flag.
   * @param  {[type]} neos [description]
   * @return {[type]}      [description]
   */
  function filterDangerous(neos) {
    var field = 'is_potentially_hazardous_asteroid';
    var filtered = neos.filter(function(neo){
      return neo[field];
    });
    return filtered;
  }
}
