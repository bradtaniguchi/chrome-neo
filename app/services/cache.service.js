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

    printDatabase: printDatabase
    //NOTE no monthly as I might not support monthly statements
  };
  /**
   * Debugging function, prints out the contents of the database in the log
   */
  function printDatabase() {
    $log.log("[[[[[DATABASE PRINTOUT]]]]]");
    $localForage.iterate(function(value, key, iterationNumber) {
      $log.log("     [" + key + "] : " + value);
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
  /*
  This function checks for old dates and removes them.
  saved in the database in the following formats:
  Day_##_Year,
  Week_##_Year,
  Month_##_year
  */
  function removeOld() {
    /*
    First get all the keys, then we need to check to see if any of them are
    considered 'old', we do this by generating the current week/month/day/year
    and comparing it to the given date.
    */
    var now = moment().now(); //get the current time
    /*
    iterate through all dates, and check to see if they are valid or not.
    */
    return "";
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
    $log.log("Looking for key: " + key);
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
    $log.log("Looking for key: " + key);
    return $localForage.getItem(key);
  }
  /*
  Checks if the given month is within the application,
  Month_##_Year
  */
  function checkMonthly(month, year) {
    var key = "Month_" + month +"_"+ year;
    $log.log("Looking for key: " + key);
    return $localForage.getItem(key); //returns a promise
  }

  /*sets the value in the cache with the daily format
  Day_##_Year
  where day is the DAY NUMBER*/
  function setDaily(day, year, object) {
    var key = "Day_" + day + "_" + year;
    $log.log("setting daily with given key: " + key);
    return $localForage.setItem(key, object); //returns promise
  }

  /*Sets the value in the cache with the weekly format:
  Week_##_Year
  where week is the WEEK NUMBER*/
  function setWeekly(week, year, object) {
    var differed = $q.defer();
    if(week >= 0 && week <= 12) {
      var key = "Week_" + week + "_" + year;
      $log.log("setting weekly with given key: " + key);
      return $localForage.setItem(key, object);
    } else {
      $log.log("Invalid week amount");
      differed.reject("Invalid week amount");
      return differed.promise;
    }
  }
  function setMonthly(month, year, object) {
    var key ="Month_" + month +"_" + year;
    $log.log("setting monthly with given key: " + key);
    return $localForage.setItem(key, object);
  }
  /*Checks if a given single item lookup exists*/
  function checkByID(spkId) {
    var key="NEO_" + spkId;
    $log.log("Looking for key: " + key);
    return $localForage.getItem(key);
  }
  function setByID(spkId, object) {
    var key = "NEO_" + spkId;
    $log.log("setting NEO with the given key: " + key);
    return $localForage.setItem(key, object);
  }
}
