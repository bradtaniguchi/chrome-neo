angular.module('chrome-neo').factory('CacheService', CacheService);
CacheService.$inject = ['$log', '$localForage'];
function CacheService($log, $localForage) {
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
  saved in the database in the format as:
  Day_##
  */
  function removeOld() {
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
