angular.module('chrome-neo').controller("CacheDialogController", CacheDialogController);
CacheDialogController.$inject=[
  '$log',
  '$mdDialog',
  '$mdToast',
  'CacheService'
];
/**
 * Dialog where the user can update caches saved items. Primarily used to clear
 * the recent history to prevent a cache overload for no reason.
 * @class angular_module.CacheDialogController
 * @name CacheDialogController
 */
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
  /*function defnitions*/
  /**
   * Init function
   */
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
   */
  function close() {
    $log.debug("closing window");
    $mdDialog.cancel();
  }
  /**
   * Function to remove a given item from the database.
   * @param  {String} key the key value to remove from the Cache.
   */
  function remove(key) {
    CacheService.remove(key).then(function(){
      onInit(); //update the keys, and size
    });
  }
  /**
   * Updates the chosen cache index to expand.
   * NOTE: this is rather ugly and not user friendly, but will have to do
   * @param  {number} index expands or closes a given index.
   */
  function expand(index) {
    if(index !== vm.chosenKeyObject)
      vm.chosenKeyObject = index;
    else
      vm.chosenKeyObject = -1;
  }
}
