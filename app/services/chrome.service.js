angular.module('chrome-neo').factory('ChromeService', ChromeService);
ChromeService.$inject = [
  '$log',
  '$window'
];
/**
 * @class angular_module.ChromeService
 * @name ChromeService
 * @description wrapper around the Chrome API
 */
function ChromeService($log, $window) {
  return {
    link: link,
    getUser: getUser
  };
  /**
   * Opens a new chrome tab with the given link
   * @param  {string} link http url to open
   */
  function link(link) {
    if(chrome.tabs){ //if in we have access to tabs, use them to create one
      chrome.tabs.create({
        url: link
      });
    } else { //if we dont, try to open it the traditional way.
      $window.open(link, '_blank');
    }
  }
  /**
   * Uses the chrome.identity platform to get the user currently logged in
   * 
   */ 
  function getUser() {
    $log.debug('Getting user email');
    $log.debug(chrome);
    if(chrome.identity) {
      chrome.identity.getProfileUserInfo(function(user){
        $log.debug(user);
        return user;
      });
    } else {
      return {};
    }
  }
}
