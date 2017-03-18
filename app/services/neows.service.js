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
    getWeekly : getWeekly,
    getDaily : getDaily,
    getMonthly : getMonthly,
    parseDays: parseDays
  };
  /*function definitions*/
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
  function getWeekly(startWeek, endWeek, weekNumber) {
    var year = moment().year();
    var week;
    if(weekNumber !== undefined) {
      week = weekNumber;
    } else {
      week = moment().week();
    }
    var differed = $q.defer();
    $log.log("Week: "+ week); //get the week of the year
    CacheService.checkWeekly(week, year).then(function(object){
      if(object !== null) {
        $log.log('key exists in cache as:');
        $log.log(object);
        /*return the data*/
        differed.resolve(object);
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
          CacheService.setWeekly(week, year, response.data).then(function(){
            /*then FINALLY return the data to the user*/
            differed.resolve(response.data);
          }); //save the whole response

        });
      }
    });
    return differed.promise;
  }
  /**
   * Gets the daily results from the NeoWsService.
   * @return {Promise} returns a promise, with the object as the first argument
   */
  function getDaily() {
    var year = moment().year();
    var day = moment().dayOfYear();
    var differed = $q.defer();

    $log.log("day " + day);
    $log.log("year " + year);
    CacheService.checkDaily(day, year).then(function(object){
      if(object !== null) {
        $log.log('key exists in cache as:');
        $log.log(object);
        /*return the data*/
        differed.resolve(object);
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
          CacheService.setDaily(day, year, response.data).then(function(){
            /*after we set it in cache we return the differed*/
            differed.resolve(response.data);
          });
        });
      }
    });
    return differed.promise;
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
    var differed = $q.defer();

    CacheService.checkMonthly(monthNumber, year).then(function(object){

      if(object !== null) {
        $log.log('key exists in cache as:');
        $log.log(object);
        /*return the data object using promise*/
        differed.resolve(object);
      } else {
        $log.log("Key does not exist, calling api 4 times(!)...");
        /*call the first week of the month*/
        var weekNumber = moment().week();
        /*get the first and last day of the first week of the current month*/
        var week1 = {}, week2={}, week3={}, week4={}; //create 4 week objects
        week1.week = weekNumber;
        week1.startDay = moment().week(weekNumber).startOf('week').format(constants.MOMENT_FORMAT); //go back 1 week
        week1.endDay = moment().week(weekNumber).endOf('week').format(constants.MOMENT_FORMAT);

        week2.week = weekNumber+1;
        week2.startDay = moment().week(weekNumber+1).startOf('week').format(constants.MOMENT_FORMAT);
        week2.endDay = moment().week(weekNumber+1).endOf('week').format(constants.MOMENT_FORMAT);

        week3.week = weekNumber+2;
        week3.startDay = moment().week(weekNumber+2).startOf('week').format(constants.MOMENT_FORMAT);
        week3.endDay = moment().week(weekNumber+2).endOf('week').format(constants.MOMENT_FORMAT);

        week4.week = weekNumber+3;
        week4.startDay = moment().week(weekNumber+3).startOf('week').format(constants.MOMENT_FORMAT);
        week4.endDay = moment().week(weekNumber+3).endOf('week').format(constants.MOMENT_FORMAT);

        $log.log("w1: " + week1.startDay + ' ' + week1.endDay + ' ' + week1.week);
        $log.log("w2: " + week2.startDay + ' ' + week2.endDay + ' ' + week2.week);
        $log.log("w3: " + week3.startDay + ' ' + week3.endDay + ' ' + week3.week);
        $log.log("w4: " + week4.startDay + ' ' + week4.endDay + ' ' + week4.week);
        /*now combine the week objects*/
        var finalObject = {}; //object to return

        /*call the get weekly amount with the given dates*/
        getWeekly(week1.startDay, week1.endDay, week1.week).then(function(object1){ //week 1
          /*we need to get the amount, to add it to the other weeks*/
          var week1ElementCount = object1.element_count;
          var week1Objects = object1.near_earth_objects;
          $log.log('got week1 objects: ' +week1ElementCount);

          finalObject.element_count = week1ElementCount;

          getWeekly(week2.startDay, week2.endDay, week2.week).then(function(object2){ //week 1
            var week2ElementCount = object2.element_count;
            var week2Objects = object2.near_earth_objects;
            $log.log("got week2 objects: " + week2ElementCount);

            finalObject.element_count +=  week2ElementCount;

            getWeekly(week3.startDay, week3.endDay, week3.week).then(function(object3){ //week 2
              var week3ElementCount = object3.element_count;
              var week3Objects = object3.near_earth_objects;
              $log.log("Get week3 objects: " + week3ElementCount);

              finalObject.element_count = finalObject.element_count + week3ElementCount;
              /*TODO: CALL IT ONE MORE TIME!*/
              getWeekly(week4.startDay, week4.endDay, week4.week).then(function(object4){
                var week4ElementCount = object4.element_count;
                var week4Objects = object4.near_earth_objects;
                $log.log("Got week4 objects: " + week4ElementCount);

                finalObject.element_count = finalObject.element_count + week4ElementCount;

                /*combine the elements
                TODO: this code below only works in ES6, I don't want to use it
                THus I have to use a function*/
                /*finalObject.near_earth_objects = Object.assign(
                  week1Objects,
                  week2Objects,
                  week3Objects,
                  week4Objects
                );*/
                finalObject.near_earth_objects = combine([
                  week1Objects,
                  week2Objects,
                  week3Objects,
                  week4Objects
                ]);

                // $log.log("Final week count: " + finalObject.element_count);
                // $log.log("Final object count(length): " + Object.keys(finalObject.near_earth_objects));
                differed.resolve(finalObject);
              }); /*Finally done wth this madness!*/
            }); //week3
          }); //week2
        }); //week1
      }// else statement
    }); //catch errors with cache/localForage service
    return differed.promise;
  }
  /**
   * Quick and dirty utility function that acts like the ES6 Object.assin function
   * This will overmap previous key values, but for what I am doing this doesnt matter.
   * @param  {list} list list of objects to combine
   * @return {object}      the final object, that combines all the keys and values.
   *                           Any overlapps are automatically written over from
   *                           the first item in the list to the last. Thus the
   *                           first item in the list has the LEAST priority.
   */
  function combine(list) {
    var finalObject = {};
    //for (var object in list) { //for each object in list
      //for (var attr in object) { //for each Attribute in object
        //finalObject[attr] = object[attr];
      //}
    //}
      /* the above code ALMOST DESTROYED MY LIFE!*/
    list.forEach(function(object){ //for each object in the list
      Object.keys(object).forEach(function(attr){//for each Attribute in object
        finalObject[attr] = object[attr];
      });
    });
    return finalObject;
  }
  /**
   * Utility function, when given an array of days, it will iterate through them
   * and return an array of all the neos.
   * @return {array} array of neos.
   * @todo: needs testing!
   */
  function parseDays(days){
    var neos = [];
    days.forEach(function() {
      days.forEach(function() {
        neos.push(neo);
      });
    });
    return neos;
  }
}
