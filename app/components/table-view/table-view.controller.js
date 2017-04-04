/*Table view Controller*/
angular.module('chrome-neo').controller('TableViewController', TableViewController);
TableViewController.$inject=[
  '$log',
  '$mdDialog',
  'constants',
  'initData', //this should be given to us from the home controller
  'moment', //we need to handle some dates here if given a month/week
  'RankItService'
];
/**
 * Dialog that is used to display a set of data with different views. This datas
 * should be formatted by the neows api.
 * @see NeoWsService
 */
function TableViewController($log, $mdDialog, constants, initData, moment,
  RankItService) {
  var vm = this;
  vm.data = {}; //all data
  vm.chart = {};
  vm.modalLabel = "TITLE";
  vm.tableType = ""; //the table type to display
  /*hide some of the NEOs in the graph, only shown for the monthly table, as
  there are two many datapoints!*/
  vm.hideNeos = "false";
  vm.chosenChartOption = 'size';
  vm.chartOptions = ['size', 'day', 'distance'];

  vm.updateChart = updateChart;
  vm.close = close;
  //vm.test = test;

  onInit(); //call the function
  return vm;
  /**
   * Parse the chart update, and select the new chart type to update with.
   * @param  {string} option chart option
   */
  function updateChart(option) {
    $log.debug('option: ' + option);
    if(option == 'size'){
      $log.debug('ordering by size');
      vm.chart = buildSizeChart(vm.data, vm.xAttribute);
    } else if(option == 'day') {
      $log.debug('ordering by day');
      vm.chart = buildDayChart(vm.data, vm.xAttribute);
    } else if(option == 'distance'){ //option = 'distance'
      $log.debug('ordering by distance');
      vm.chart = buildDistanceChart(vm.data, vm.xAttribute);
    } else {
      $log.error("invalid option given! Cannot generate chart");
    }
  }
  /*function definitons*/
  function onInit() {

    /*define our chart object*/
    parseData();
    updateChart(vm.tableType);
  }
  /**
   * Parses the given data and applies it to the settings.
   */
  function parseData(){
    vm.tableType = initData.tableType;
    vm.data = initData.data.near_earth_objects;
    vm.modalLabel = initData.modalLabel;
    $log.log(initData);
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
  /**
   * closes the dialog popup
   */
  function close() {
    $mdDialog.hide();
  }
  /**
   * Builds a chart object by considering distance.
   * @param  {Object} data object that is parsed using paredNeos.
   * @return {object} returns chart data object
   */
  function buildDistanceChart(data) {
    var labels=[];
    var chartData=[];
    var labelString= "distance in Km";
    chartData.push(parseNeos(data)
    .sort(function(a, b){
     return a.close_approach_data[0].miss_distance.kilometers -
            b.close_approach_data[0].miss_distance.kilometers;
    })
    .map(function(neo){
      labels.push(neo.name);
      return neo.close_approach_data[0].miss_distance.kilometers;
    }));

    return {
      data: chartData,
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
   * Builds a chart based on min and max estimated sizes
   * @param  {object} data       an object with keys that represent different days
   */
  function buildSizeChart(data) {
    var labels =[];
    var chartData = [];
    var labelString = 'Size in Meters';

    chartData.push(parseNeos(data)
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
    chartData.push(parseNeos(data)
    /*Sort the parsed data by estimatedDiameter*/
    .sort(function(a, b){
      return a.estimated_diameter.meters.estimated_diameter_max -
             b.estimated_diameter.meters.estimated_diameter_max;
    })
    /*because we want to see how large these guys are, map to return the estimated diameter*/
    .map(function(neo){
      return neo.estimated_diameter.meters.estimated_diameter_max;
    }));

    return {
      data: chartData,
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
   * Builds a chart based on days. Showing the amount per day.
   * @param  {object} data       an object with keys that represent different days
   */
  function buildDayChart(data) {
    var labels = [];
    var chartData = [[]];
    var labelString =  'Order by Size';
    labels = Object.keys(data);
    labelString = "NEOs per day";
    /*chartjs requires an array of arrays. Or an array of GRAPH DATA.*/
    Object.keys(data).forEach(function(key){
      chartData[0].push(data[key].length);
    });
    return {
      data: chartData,
      labels: labels,
      options: {
        //onClick: //use this to handle on clicks
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
   * Builds a chart on closest approach distance (!)
   * We also parse for ONLY the top 10 NEOs. This utilizes the RankItSerivce.
   * @param  {[type]} data       [description]
   * @param  {[type]} xAttribute [description]
   * @return [type]              [description]
   * @TODO: finish the functionality of this function. Until it is implimented.
   * I will just use order by size for the month.
   * @NOTE: Check this URL to view how the data is structured
   * https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
   */
  function buildClosestChart(data) {
    var labels = [];
    var chartData = [[]];
    var labelString = 'Closest Appraoch';

    return {
      data: chartData,
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
}
