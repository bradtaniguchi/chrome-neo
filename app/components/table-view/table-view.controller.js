/*Table view Controller*/
angular.module('chrome-neo').controller('TableViewController', TableViewController);
TableViewController.$inject=[
  '$log',
  '$mdDialog',
  'constants',
  'initData', //this should be given to us from the home controller
  'moment' //we need to handle some dates here if given a month/week
];

function TableViewController($log, $mdDialog, constants, initData, moment) {
  var vm = this;
  vm.data = {}; //all data
  vm.chart = {};
  vm.tableType = "";
  vm.xAttribute = "";
  vm.close = close;
  //vm.test = test;

  onInit(); //call the function
  return vm;

  /*function definitons*/
  function onInit() {
    var labels = [];
    var data = [];
    var labelString = ""; //this is what to show on the Y axis

    /*define our chart object*/
    parseData(); //setup this components settings
    if(vm.xAttribute === undefined) {//use days of the week
      labels = Object.keys(vm.data);
      labelString = "NEOs per day";
      /*chartjs requires an array of arrays. Or an array of GRAPH DATA.*/
      data = [[]];
      vm.tableType = "NEOs per Day";
      Object.keys(vm.data).forEach(function(key){
        data[0].push(vm.data[key].length);
      });
    } else if (vm.xAttribute === 'monthly') {
      $log.log("This isnt support yet...");
      labels = [];
      data = [];
    } else { //we are going to use vm.xAttribute through ALL datapoints
      vm.tableType = "Estimated Diameter in meters";
      labelString = "Size in Meters";
      /*now we have the neos, time to sort them by different parameters
      for now we are going to order by in estimated_diameter_min.kilometers
            "estimated_diameter_min":0.0366906138,
            "estimated_diameter_max":0.0820427065*/

      data.push(parseNeos(vm.data)
      /*Sort the parsed data by estimatedDiameter*/
      .sort(function(a, b){
        return a.estimated_diameter.meters.estimated_diameter_min -
               b.estimated_diameter.meters.estimated_diameter_min;
      })
      /*because we want to see how large these guys are, map to return the estimated diameter*/
      .map(function(neo){
        labels.push(neo.name);
        return neo.estimated_diameter.meters.estimated_diameter_min;
      }));

      /*now sort by max*/
      data.push(parseNeos(vm.data)
      /*Sort the parsed data by estimatedDiameter*/
      .sort(function(a, b){
        return a.estimated_diameter.meters.estimated_diameter_max -
               b.estimated_diameter.meters.estimated_diameter_max;
      })
      /*because we want to see how large these guys are, map to return the estimated diameter*/
      .map(function(neo){
        return neo.estimated_diameter.meters.estimated_diameter_max;
      }));

    }
    /*create the chart*/
    vm.chart = {
      data: data,
      labels: labels,
      options: {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: labelString
            }
          }]
        },
        tooltips: {
          enabled: true
        }
      }
    };
  }
  /**
   * Parses the given data and applies it to the settings.
   */
  function parseData(){
    vm.xAttribute = initData.xAttribute;
    vm.data = initData.data.near_earth_objects;
  }
  /**
   * Utility function that takes the near_earth_objects as the first argument,
   * and iterates through all the days and returns just the NEOs for that period.
   * This is useful to order through all the NEOs of the given period by their parameters
   * @return {array} array of NEOs that can be ordered by other parameters
   */
  function parseNeos(data){
    var elements = []; //these are the NEO's regardless of day
    /*
    for each day/key we need to get its elements for that day, these
    are left within a list that we must iterate through.
    */
    Object.keys(data).forEach(function(key){
      data[key].forEach(function(neo){
        elements.push(neo);
      });
    });
    return elements;
  }
  function close() {
    $mdDialog.hide();
  }
}
