angular.module('chrome-neo').controller('AboutController', AboutController);
AboutController.$inject = [
  '$log',
  '$rootScope'];
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
