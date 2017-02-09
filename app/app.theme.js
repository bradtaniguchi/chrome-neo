angular.module('chrome-neo').config(theme);
theme.$inject = ['$mdThemingProvider'];
function theme($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey')
    .accentPalette('light-blue');
}
