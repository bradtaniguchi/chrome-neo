angular.module('chrome-neo').controller('SettingsController', SettingsController);
SettingsController.$inject=[
  '$log',
  'CacheService',
  '$mdDialog',
  '$rootScope'
];
/**
 * @class angular_module.SettingsController
 * @name SettingsController
 * @description controller for the settings view, which handles cache related
 * settings, such as clearing and removing select items from the cache store.
 */
function SettingsController($log, CacheService, $mdDialog, $rootScope) {
  var vm = this;

  vm.deleteDb = deleteDb;
  vm.cleanDb = cleanDb;
  vm.printDb = printDb;
  return vm;
  /*function defintions*/
  /**
   * Deletes the entire localCahce storage, and shows an alert when completed.
   * @param {object} event location on the dom where the event occured.
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
  /**
   * Calls the cache service remove old function which removes older files but
   * keeps recent queries.
   * @param {object} event location on the dom where the event occured.
   */
  function cleanDb(event) {
    $log.debug('Removing old items from the database!');
    CacheService.removeOld();
    /*add async loading ETC here!*/
  }
  /**
   * Opens a modal to display all the data that the cache service can find
   * @param {object} event location on the dom where the event occured.
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
