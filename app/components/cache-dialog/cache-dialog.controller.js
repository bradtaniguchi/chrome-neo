angular.module('chrome-neo').controller("CacheDialogController", CacheDialogController);
CacheDialogController.$inject=[
  '$log',
  '$mdDialog',
  '$mdToast',
  'CacheService'
];

function CacheDialogController($log, $mdDialog, $mdToast, CacheService) {
  var vm = this;
  vm.loading = false; //custom loading bar for just this dialog
  vm.keyObjects = [];
  vm.chosenKeyObject = -1; //index of the chosen index
  vm.size = 0;

  vm.close = close;
  vm.remove = remove;
  vm.expand = expand;

  onInit();
  return vm;
  /*function defnition*/
  function onInit() {
    var counter = 0;
    vm.loading = true;
    CacheService.size().then(function(keys){
      vm.size = keys.length;
      counter = counter + 1;
      if(counter == 2) vm.loading = false;
    });
    CacheService.getKeyObjects().then(function(keyObjects){
      vm.keyObjects = keyObjects;
      counter = counter + 1;
      if(counter == 2) vm.loading = false;
    });
    vm.chosenKeyObject = -1;
  }
  /**
   * Close the modal
   * @return {[type]} [description]
   */
  function close() {
    $log.debug("closing window");
    $mdDialog.cancel();
  }
  /**
   * Function to remove a given item from the database.
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  function remove(key) {
    CacheService.remove(key).then(function(){
      onInit(); //update the keys, and size
    });
  }
  /**
   * Updates the chosen cache index to expand.
   * NOTE: this is rather ugly and not user friendly, but will have to do
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  function expand(index) {
    if(index !== vm.chosenKeyObject)
      vm.chosenKeyObject = index;
    else
      vm.chosenKeyObject = -1;
  }
}
