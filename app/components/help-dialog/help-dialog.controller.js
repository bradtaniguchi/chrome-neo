angular.module("chrome-neo").controller("HelpDialogController", HelpDialogController);
HelpDialogController.$inject = ['$log', 'queryFields', '$mdDialog'];
function HelpDialogController($log, queryFields, $mdDialog) {
  var vm = this;
  vm.list = []; //list of to display
  vm.definitions = []; //list of definitions to display
  vm.close = close;
  //vm.$onInit = onInit;
  onInit(); //as a dialog I need to essentially use a duct tape solution...

  return vm;
  /*function definitions*/
  function onInit() {
    buildList(); //call the function to build the help definitions
  }
  function close() {
    $log.log("Closing window");
    $mdDialog.cancel();
  }
  /**
   * Builds the list of help definitions
   */
  function buildList() {
    $log.log("Building list...");
    vm.list = Object.keys(queryFields); //get the keys
    vm.definitions = queryFields;
    $log.log(vm.definitions);
    /*for each item, we want to replace their "key value" with
    an object with BOTH the key value, and their definition*/
    /*vm.list.map(function(keyValue){
      $log.log("Map");
      return {
        "keyValue" : keyValue,
        "definition" : queryFields[keyValue]
      };
    });*/
  }
}
