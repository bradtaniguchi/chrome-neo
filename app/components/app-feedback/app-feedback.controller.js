var appFeedback = {
  templateUrl: "components/app-feedback/app-feedback.view.html",
  controller: "AppFeedbackController as vm"
};
angular.module('chrome-neo')
.component('appFeedback', appFeedback)
.controller('AppFeedbackController', AppFeedbackController);
AppFeedbackController.$inject=[
  '$log',
  'FeedbackService'
];
function AppFeedbackController($log, FeedbackService){
  var vm = this;
  vm.feedback = {}; //the form object to return
  vm.submit = submit;
  return vm;
  /*function defintion*/
  function submit(form) {
    FeedbackService.send(form.email, form.comments).then(function(response){
      $log.debug(response);
    }).catch(function(error){
      $log.error(error);
    });
  }
}