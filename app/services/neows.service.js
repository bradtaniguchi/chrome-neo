/*
TODO: I need to utilize some sort of chaching of data for the day.
That way I don't make to many requests.
*/
angular.module('chrome-neo').factory('NeoWsService', NeoWsService);
NeoWsService.$inject = [
  '$log',
  '$http',
  'constants',
  'moment',
  'CacheService'
];
function NeoWsService($log, $http, constants, moment, CacheService) {
  return {
    test: test,
    getWeekly : getWeekly,
    getDaily : getDaily,
    getMonthly : getMonthly
  };
  /*function definitions*/
  function test(callback) {
    /*test to see if you can make a connection to the service.*/
    callback(true);
  }
  /*get the weekly amount of NEOs known*/
  function getWeekly() {
    
    
    /*return $http({i
      url: constants.NEOWS_BASE_URL,
      method: 'GET',
      params: {
        api_key : constants.API_KEY
      }
    });*/
  }
  /*gets the daily amount of NEOs known*/
  function getDaily() {
    var day = moment().dayOfYear();
    var year = moment().year();
    
    $log.log("day " + day);
    $log.log("year " + year);
    
    CacheService.checkDaily(day, year).then(function(key){
      if(key !== null) {
        $log.log("Key exists in Cache as: " + key);
        /*return the data*/
      } else {
        $log.log("Key does not exist, calling api...");
        var today = moment().format(constants.MOMENT_FORMAT);
        $log.log("todays date: " + today);
        
        /*call API and return data*/
      }
    });
    
    /*return $http({
      url: constants.NEOWS_BASE_URL,
      method: 'GET',
      params: {
        start_date : today,
        end_date : today,
        api_key : constants.API_KEY
      }
    });*/
  }
  /*gets monthly, don't impliment this until I have caching setup.
  As this is A LOT OF DATA. I don't want to keep more than I need, especially
  if I ask for the data constantly
  TODO: I just found out that the NeoWsService doesn't even support monthly queries
  Thus I have 2 choices scrap the monthly view, and replace it OR do a combo
  parse which combines the month weeks*/
  function getMonthly() {
    /*
    First I need to check to see if I already got the current months amount from
    the cache service. The Cache service needs the month and year
    */
    //var q = $q.differ; //impliment promise
    //see this help ()http://markdalgleish.com/2013/06/using-promises-in-angularjs-views/
    var monthNumber = moment().month(); //note 0 is janurary
    var yearNumber = moment().year();
    CacheService.checkMonthly(monthNumber, yearNumber).then(function(object){
      if(key !== null) {
        $log.log("Key exists in Cache as: " + object);
        /*return the data object using promise*/
      } else {
        $log.log("Key does not exist, calling api...");

        var startWeek = moment().startOf('week').format(constants.MOMENT_FORMAT);
        var endWeek = moment().endOf('week').format(constants.MOMENT_FORMAT);
        $log.log("Start Week " + monthNumber+ " " + yearNumber);
        $log.log("End Week " + startWeek + " " + endWeek);
        /*call API and return data*/
        /*TODO add integration*/
        /*Save data using CacheService*/
      }
    }); //catch errors with cache/localForage service
    return "";
  }
}
