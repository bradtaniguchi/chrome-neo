angular.module('chrome-neo').factory('CacheService', CacheService);
CacheService.$inject = [
  '$log', //for basic logging
  '$localForage', // interface API to handling the local storage on the machine
  '$q', //Going to use promises to return, so it works the same as localForage
  'moment', //Used to handle time handling
  'constants' //application constants, used mainly for moment format.
];
function CacheService($log, $localForage, $q, moment, constants) {
  return {
    test: test,
    clear: clear,
    checkDaily: checkDaily,
    checkWeekly: checkWeekly,
    checkMonthly: checkMonthly,
    checkByID : checkByID,

    setDaily : setDaily,
    setWeekly : setWeekly,
    setMonthly : setMonthly,
    setByID : setByID,

    getKeyObjects : getKeyObjects,
    removeOld : removeOld,
    printDatabase: printDatabase,
    size : size,
    remove : remove
    //NOTE no monthly as I might not support monthly statements
  };
  /**
   * Returns the number of entries in the database as the first argument to a promise
   * @return {promise} promise with the first argument the number of items within
   *                           the database.
   * @TODO: update this function to return a promise with the size, not the keys
   * makes for a ungly and confusing API.
   */
  function size() {
    return $localForage.keys();
  }
  /**
   * Removes a key from the database
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  function remove(key) {
    return $localForage.removeItem(key);
  }
  /**
   * Function that gets all the keys in the database, and their corresponding
   * objects and returns them as a list of keyObjects. with two params:
   * key : KEY NAME
   * object : OBJECT NAME
   * @return {promise} arry of key objects
   */
  function getKeyObjects() {
    var differed = $q.defer();
    var arr = [];
    var counter = 0;
    var max;
    $localForage.keys().then(function(keys){
      max = keys.length;
      keys.forEach(function(key){
        $localForage.getItem(key).then(function(object){
          arr.push({
            key : key,
            object : object
          });
        });
        counter = counter + 1;
        if(counter >= max) differed.resolve(arr);
      });
    });
    return differed.promise;
  }
  /**
   * Debugging function, prints out the contents of the database in the log
   */
  function printDatabase() {
    $log.log("[[[[[DATABASE PRINTOUT]]]]]");
    $localForage.iterate(function(value, key, iterationNumber) {
      $log.log(key);
      $log.log(value);
    });
  }
  /*function definitions*/
  function test(callback) {
    callback(true);
  }
  /**
   * [clearCache description]
   * @return {promise} returns a promise with no arguments. To assist in chaining
   */
  function clear() {
    $log.log("Clearing Cache...");
    return $localForage.clear();
  }
  /**
   * Function to remove old entries in the localForage database.
   * @param  {number} week optional argument, if not given this function automatically
   *                       calculates the current week of the year
   * @param  {number} day  optional argument, if not gien this function automatically
   *                       calculates the current day of the year.
   */
  function removeOld(week, day) {
    var weekDiff = 5;
    var dayDiff = 8;
    if(typeof(week) !== "number")
      week = moment().week();
    if(typeof(day) !== "number")
      day = moment().day();
    $localForage.keys().then(function(keys){
      keys.forEach(function(key){
        if(key.startsWith('Week_')){
          /*see if the current moment, day of week is different*/
          if(week + weekDiff > key){
            $localForage.removeItem(key);
          }
        }

        if(key.startsWith('Day_')){
          if(day + dayDiff > key) {
            $localForage.removeItem(key);
          }
        }
      });
    });
  }
  /*
  Checks if the given date is in the local store,
  if it isn't it adds the object under the given date.
  saved as:
  Day_##_Year
  @returns object of whats given, or if it is in the datastore
  */
  function checkDaily(day, year) {
    var key = "Day_" + day + "_" + year;
    $log.debug("Looking for key: " + key);
    return $localForage.getItem(key);
  }
  /*
  Checks if the given week number is within the application,
  NOTE because a simple number is not suffecient to be a seperate key, it will
  be left as:
  Week_##_Year
     var weeknumber = moment("12-25-1995", "MM-DD-YYYY").week();
  */
  function checkWeekly(week, year) {
    var key = "Week_" + week + "_" + year;
    $log.debug("Looking for key: " + key);
    return $localForage.getItem(key);
  }
  /*
  Checks if the given month is within the application,
  Month_##_Year
  */
  function checkMonthly(month, year) {
    var key = "Month_" + month +"_"+ year;
    $log.debug("Looking for key: " + key);
    return $localForage.getItem(key); //returns a promise
  }

  /**
   * Sets the alue in the cache with the daily format
   * DAY_##_Year
   * @param {number} day    day to save as
   * @param {number} year   year to save as
   * @param {object} object Object so save in cache.
   */
  function setDaily(day, year, object) {
    if(day >= 0 && day <= 366) {
      var key = "Day_" + day + "_" + year;
      $log.debug("setting daily with given key: " + key);
      /*add day of year to object*/
      object.dbEntry = day;
      return $localForage.setItem(key, object); //returns promise
    } else {
      var differed = $q.defer();
      $log.error("Invalid day amount");
      differed.reject("Invalid day amount");
      return differed.promise;
    }
  }

  /*Sets the value in the cache with the weekly format:
  Week_##_Year
  where week is the WEEK NUMBER*/
  function setWeekly(week, year, object) {
    if(week >= 0 && week <= 52) {
      var key = "Week_" + week + "_" + year;
      $log.debug("setting weekly with given key: " + key);
      /*add week of year to object*/
      object.dbEntry = week;
      return $localForage.setItem(key, object);
    } else {
      var differed = $q.defer();
      $log.error("Invalid week amount");
      differed.reject("Invalid week amount");
      return differed.promise;
    }
  }
  function setMonthly(month, year, object) {
    if(month >= 0 && month <= 12) {
      var key ="Month_" + month +"_" + year;
      $log.debug("setting monthly with given key: " + key);
      return $localForage.setItem(key, object);
    } else {
      var differed = $q.defer();
      $log.error("Invalid month ammount");
      differed.reject("invalid month amount");
      return differed.promise;
    }
  }
  /*Checks if a given single item lookup exists*/
  function checkByID(spkId) {
    var key="NEO_" + spkId;
    $log.debug("Looking for key: " + key);
    return $localForage.getItem(key);
  }
  function setByID(spkId, object) {
    var key = "NEO_" + spkId;
    $log.debug("setting NEO with the given key: " + key);
    return $localForage.setItem(key, object);
  }
}
