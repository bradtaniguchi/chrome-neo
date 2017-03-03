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
  vm.xAttribute = "";
  vm.close = close;
  //vm.test = test;

  onInit(); //call the function
  return vm;

  /*function definitons*/
  function onInit() {
    var labels = [];
    var data = [];
    /*define our chart object*/
    parseData(); //setup this components settings
    if(vm.xAttribute === undefined) {//use days of the week
      labels = Object.keys(vm.data);
      data = [];
      Object.keys(vm.data).forEach(function(key){
        data.push(vm.data[key].length);
      });
    } /*add other possible attributes here*/
    vm.chart = {
      data: data,
      labels: labels,
      options: {
        tooltips: {
          enabled: false
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
  function close() {
    $mdDialog.hide();
  }
}
