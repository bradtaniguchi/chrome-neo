angular.module('chrome-neo').controller('AboutController', AboutController);
AboutController.$inject = [
  '$log',
  '$rootScope'];
/**
 * @class angular_module.AboutController
 * @name AboutController
 * @description Controller for the about view that displays information about
 * the development of this application.
 */
function AboutController($log, $rootScope) {
  var vm = this;
  vm.technologies = [];
  vm.$onInit = onInit;

  return vm;
  /*function definitions*/
  function onInit() {
    techInit(); //init the technologies
    $rootScope.loading = false;
  }
  /**
   * Declaration utility function that holds all the technologies.
   * @todo add more technologies that I used to build the program.
   */
  function techInit() {
    vm.technologies = [
      {
        'title': "angularjs",
        'description' : "Front-end framework for single web pages.",
        'link': "https://angularjs.org/"
      },
      {
        'title': "Angular Material",
        'description' : "Google's front-end material design for Angular.",
        'link': "google.com"
      },
      {
        'title': "Nodejs",
        'description' : "Utilized for a build tool, with gulp.",
        'link': "nodejs.org"
      }
    ];
  }
}
