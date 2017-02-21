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
    checkDaily: checkDaily,
    checkWeekly: checkWeekly,
    checkMonthly: checkMonthly,
    checkByID : checkByID
  };
  /*function definitions*/
  function test(callback) {
    callback(true);
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
  function checkDaily(day, year, object) {
    return "";
  }
  /*
  Checks if the given week number is within the application,
  NOTE because a simple number is not suffecient to be a seperate key, it will
  be left as:
  Week_##_Year
     var weeknumber = moment("12-25-1995", "MM-DD-YYYY").week();
  */
  function checkWeekly(week, year) {
    return "";
  }
  /*
  Checks if the given month is within the application,
  Month_##_Year
  */
  function checkMonthly(month, year) {
    return "";
  }
  /*Checks if a given single item lookup exists*/
  function checkByID(spkId) {

  }
}