angular.module('chrome-neo')
.factory('FeedbackService', FeedbackService);

FeedbackService.$inject=[
  '$log',
  '$http'
];

function FeedbackService($log, $http) {
  var URL = 'https://script.google.com/macros/s/AKfycbxPnSjLislm5c2QTFlDWMqR5qFCJGrlIcX5kMkoSzZfZ50QU1c/dev';
  return {
    send : send
  };
  /*function definitions*/
  function send(email, comments) {
    $log.debug('sending request to feedback api');
    var data = {
      time: new Date().toString(),
      email: email,
      comments: comments
      //callback: callback
    };
    $log.debug(data);
    var buildUrl=URL+
    "?email="+data.email+
    "&time="+data.time+
    "&comments="+data.comments;
    
    return $http.get(buildUrl);
  } 
}