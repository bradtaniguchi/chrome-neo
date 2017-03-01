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
  'CacheService',
  '$q'
];
function NeoWsService($log, $http, constants, moment, CacheService, $q) {
  return {
    test: test,
    getWeekly : getWeekly,
    getDaily : getDaily,
    getMonthly : getMonthly
  };
  /*function definitions*/
  /**
   * Test function, will be removed in the future
   * @param  {Function} callback callback function to test...
   * @return {None}
   */
  function test(callback) {
    /*test to see if you can make a connection to the service.*/
    callback(true);
  }
  /**
   * Calls the NeoWsService with the parameter start week and end week. If these
   * are not given, the function automatically uses this week's start and end.
   * These dates are required for the NeoWsService
   * @param  {Date} startWeek date of the first day of the week, if not given
   *                          we get the current startWeek date
   * @param  {Date} endWeek   date of the last day of the week, if not given
   *                          we get the current endWeek date
   * @return {Promise} promise with the object data as the first argument.
   *                           This data could come from either the localForage
   *                           cache or the http request. Regardless it SHOULD
   *                           look the same.
   */
  function getWeekly(startWeek, endWeek) {
    var year = moment().year();
    var week = moment().week();
    $log.log("Week: "+ week); //get the week of the year
    CacheService.checkDaily(week, year).then(function(object){
      var differed = $q.differ();
      if(object !== null) {
        $log.log("Key exists in Cache as: " + object);
        /*return the data*/
        differed.resolve(object);
        return differed;

      } else {
        $log.log("Key does not exist, calling api...");
        if(startWeek === undefined) {
          startWeek = moment().startOf('week').format(constants.MOMENT_FORMAT);
        }
        if(endWeek === undefined) {
            endWeek = moment().endOf('week').format(constants.MOMENT_FORMAT);
        }
        $log.log("start of week: " + startWeek);
        $log.log("end of week: " + endWeek);
        /*call api and return data*/
        $http({
          url: constants.NEOWS_BASE_URL,
          method: 'GET',
          params: {
            start_date: startWeek,
            end_date: endWeek,
            api_key : constants.API_KEY
          }
          /*get the response from the http request, stash it then return it*/
        }).then(function(response){
          $log.log('Saving response in cache from NeoWsService');
          CacheService.setWeekly(week, year, response).then(function(){
            /*then FINALLY return the data to the user*/
            differed.resolve(response);
          }); //save the whole response
          return differed;
        });
      }
    });
  }
  /**
   * Gets the daily results from the NeoWsService.
   * @return {Promise} returns a promise, with the object as the first argument
   */
  function getDaily() {
    var year = moment().year();
    var day = moment().dayOfYear();

    $log.log("day " + day);
    $log.log("year " + year);
    CacheService.checkDaily(day, year).then(function(object){
      if(object !== null) {
        $log.log("Key exists in Cache as: " + object);
        /*return the data*/
        var differed = $q.differ();
        differed.resolve(object);
        return differed;
      } else {
        $log.log("Key does not exist, calling api...");
        var today = moment().format(constants.MOMENT_FORMAT);
        $log.log("todays date: " + today);

        /*call API and return data*/
        return $http({
          url: constants.NEOWS_BASE_URL,
          method: 'GET',
          params: {
            start_date : today,
            end_date : today,
            api_key : constants.API_KEY
          }
        }).then(function(response){
          CacheService.setDaily(day, year, response).then(function(){
            /*after we set it in cache we return the differed*/
            differed.resolve(response);
          });
          return differed;
        });
      }
    });
  }
  /**
   * Gets monthly, don't impliment this until I have caching setup.
   * As this is A LOT OF DATA. I don't want to keep more than I need, especially
   * if I ask for the data constantly
   * @return {Promise} returns a promise with the data as the first argument.
   *                           Since there is no support for a monthly query this
   *                           data is compiled from all the weeks of the month.
   *                           It itself is also cached using the caching service.
   *
   * TODO: I just found out that the NeoWsService doesn't even support monthly queries
   * Thus I have 2 choices scrap the monthly view, and replace it OR do a combo
   * parse which combines the month weeks
   */
  function getMonthly() {
    var year = moment().year();
    var monthNumber = moment().month(); //note 0 is janurary
    CacheService.checkMonthly(monthNumber, year).then(function(object){
      if(object !== null) {
        $log.log("Key exists in Cache as: " + object);
        /*return the data object using promise*/
        var differed = $q.differ();
        differed.resolve(object);
        return differed;
      } else {
        $log.log("Key does not exist, calling api 4 times(!)...");
        /*call the first week of the month*/
        var weekNumber = moment().week();
        /*get the first and last day of the first week of the current month*/
        var week1 = {}, week2={}, week3={}, week4={}; //create 4 week objects
        week1.startDay = moment().week(weekNumber).startOf('week').format(constants.MOMENT_FORMAT); //go back 1 week
        week1.endDay = moment().week(weekNumber).endOf('week').format(constants.MOMENT_FORMAT);

        week2.startDay = moment().week(weekNumber+1).startOf('week').format(constants.MOMENT_FORMAT);
        week2.endDay = moment().week(weekNumber+1).endOf('week').format(constants.MOMENT_FORMAT);

        /*call the get weekly amount with the given dates*/
        getWeekly(week1.startDay, week1.endDay).then(function(object){
          /*we need to get the amount, to add it to the other weeks*/
          var week1ElementCount = object.element_count;
          var week1Objects = object.near_earth_objects;
          $log.log('got week1, objects: ' +week1ElementCount);
          getWeekly(week2.startDay, week3.endDay).then(function(object2){
            var week2ElementCount = object.element_count;
            var week2Objects = object.near_earth_objects;
            $log.log("got week2, objects: " + week2ElementCount);

            /*now combine the week objects*/
            var finalObject = {}; //object to return
            finalObject.totalCount = week1ElementCount + week2ElementCount;
            finalObject.objects = Object.assign({}, week1Objects,week2Objects);
            $log.log("Final week count: " + finalObject.totalCount);
            $log.log("Final object count(length): " + finalObject.objects.length);
          });
          /*TODO: ADD MORE WEEKS LATER!*/
          /*TODO: SAVED TO CACHE ONCE TESTED!!*/
        });
        $log.log("Start this Week " + monthNumber+ " " + year);
        $log.log("End this Week " + startWeek + " " + endWeek);
        /*Due to the fact the API only supports up to weekly reports, I will
        just call the getWeekly function and combine its data.*/
        /*call API and return data*/
        return "";
      }
    }); //catch errors with cache/localForage service
  }
}
