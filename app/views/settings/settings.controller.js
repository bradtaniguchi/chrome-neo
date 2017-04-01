angular.module('chrome-neo').controller('SettingsController', SettingsController);
SettingsController.$inject=[
  '$log',
  'CacheService',
  '$mdDialog',
  '$rootScope'
];

function SettingsController($log, CacheService, $mdDialog, $rootScope) {
  var vm = this;

  vm.deleteDb = deleteDb;
  vm.cleanDb = cleanDb;
  vm.printDb = printDb;
  return vm;
  /*function defintions*/
  /**
   * Clears the database of ALL entires
   * @return {[type]} [description]
   */
  function deleteDb(event) {
    $log.debug('Removing all items in the database');
    CacheService.size().then(function(keys){
      CacheService.clear().then(function(){
        $log.debug('in cache clear');
        $mdDialog.show(
          $mdDialog.alert()
          .title('Cleared Cache!')
          .parent(angular.element(document.body))
          .textContent('Successfully cleared the cache of ' + keys.length + ' items')
          .ariaLabel('Cleared cache')
          .targetEvent(event)
          .ok('Okay!'));
          //.cancel('I\'m a cat person');
      });
    });
  }
  function cleanDb(event) {
    $log.debug('Removing old items from the database!');
    CacheService.removeOld();
    /*add async loading ETC here!*/
  }
  /**
   * Opens a modal to display all the data that the cache service can find
   * @return {[type]} [description]
   */
  function printDb(event) {
    $log.debug('Printing database...');
    $mdDialog.show({
      controller: 'CacheDialogController as vm',
      templateUrl: 'components/cache-dialog/cache-dialog.view.html',
      parent : angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose : true
    });
  }
}
