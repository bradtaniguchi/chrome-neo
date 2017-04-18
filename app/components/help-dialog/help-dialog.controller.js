angular.module("chrome-neo").controller("HelpDialogController", HelpDialogController);
HelpDialogController.$inject = ['$log', 'queryFields', '$mdDialog'];
/**
 * Displays defintions for all the NEO parameters that I could figure out
 * and research about. They appear with their definitions as defined
 * @class angular_module.HelpDialogController
 * @name HelpDialogController
 * @see constants
 */
function HelpDialogController($log, queryFields, $mdDialog) {
  var vm = this;
  vm.list = []; //list of to display
  vm.definitions = []; //list of definitions to display
  vm.close = close;
  onInit(); //as a dialog I need to essentially use a duct tape solution...

  return vm;
  /*function definitions*/

  function onInit() {
    buildList(); //call the function to build the help definitions
  }
  /**
   * Closes the modal popup window
   */
  function close() {
    $log.debug("Closing window");
    $mdDialog.cancel();
  }
  /**
   * Builds the list of help definitions
   */
  function buildList() {
    $log.debug("Building list...");
    vm.list = Object.keys(queryFields); //get the keys
    vm.definitions = queryFields;
    $log.debug(vm.definitions);
  }
}
