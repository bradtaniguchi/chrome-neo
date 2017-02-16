/*
TODO: I need to utilize some sort of chaching of data for the day.
That way I don't make to many requests.
*/
angular.module('chrome-neo').factory('NeoWsService', NeoWsService);
NeoWsService.$inject = ['$log', '$http', 'constants', 'moment'];
function NeoWsService($log, $http, constants, moment) {
  return {
    test: test,
    getWeekly : getWeekly,
    getDaily : getDaily,
  };
  /*function definitions*/
  function test(callback) {
    /*test to see if you can make a connection to the service.*/
    callback(true);
  }
  /*get the weekly amount of NEOs known*/
  function getWeekly() {
    return $http({
      url: constants.NEOWS_BASE_URL,
      method: 'GET',
      params: {
        /*So not safe, but cmon its or science!*/
        api_key : constants.API_KEY
      }
    });
  }
  /*gets the daily amount of NEOs known*/
  function getDaily() {
    /*get todays date*/
    var today = moment().format(constants.MOMENT_FORMAT);
    return $http({
      url: constants.NEOWS_BASE_URL,
      method: 'GET',
      params: {
        start_date : today,
        end_date : today,
        api_key : constants.API_KEY
      }
    });
  }
  /*gets monthly, don't impliment this until I have caching setup.
  As this is A LOT OF DATA. I don't want to keep more than I need, especially
  if I ask for the data constantly*/
  function getMonthly() {
    return "";
  }
}
