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
  vm.size = 0;

  vm.close = close;
  vm.remove = remove;

  onInit();
  return vm;
  /*function defnition*/
  function onInit() {
    var counter = 0;
    $log.debug('in init for CacheDialog');
    vm.loading = true;
    CacheService.size().then(function(keys){
      vm.size = keys.size;
      counter = counter + 1;
      if(counter == 2) vm.loading = false;
    });
    CacheService.getKeyObjects().then(function(keyObjects){
      vm.keyObjects = keyObjects;
      counter = counter + 1;
      if(counter == 2) vm.loading = false;
    });
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
      $mdToast.show(
      $mdToast.simple()
        .textContent('Remove item!')
        //.position(pinTo )
        .hideDelay(3000)
      );
    });
  }
}
