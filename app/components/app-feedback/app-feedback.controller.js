var appFeedback = {
  templateUrl: "components/app-feedback/app-feedback.view.html",
  controller: "AppFeedbackController as vm"
};
angular.module('chrome-neo')
.component('appFeedback', appFeedback)
.controller('AppFeedbackController', AppFeedbackController);
AppFeedbackController.$inject=[
  '$log',
  '$mdToast',
  'FeedbackService'
];
function AppFeedbackController($log, $mdToast, FeedbackService){
  var vm = this;
  vm.feedback = {}; //the form object to return
  vm.submit = submit;
  vm.$onInit = onInit;
  return vm;
  /*function defintion*/
  function onInit() {
    
  }
  function submit(form) {
    FeedbackService.send(form.email, form.comments).then(function(response){
      $log.debug(response);
      $mdToast.show($mdToast.simple()
        .textContent('Feedback Sent!')
        .position('right')
        .hideDelay(1000));
    }).catch(function(error){
      $mdToast.show($mdToast.simple()
        .textContent('Feedback Send Error!')
        .position('right')
        .hideDelay(1000));
      $log.error(error);
    });
    vm.feedback = {};
  }
}