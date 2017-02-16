(function() {
  'use strict';
  //http://www.syntaxsuccess.com/viewarticle/how-to-mock-http-calls-in-angular
  describe("Home controller", function() {
    var HomeController;
    var httpBackend;
    beforeEach(function() {
      angular.mock.module('chrome-neo');
      
      inject(function($controller, $injector) {
        HomeController = $controller('HomeController');
        httpBackend = $injector.get('$httpBackend');
      });
      
      httpBackend
      .when('GET', 'https://api.nasa.gov/neo/rest/v1/feed')
      .respond(200, {
        data: {
          "element_count" : 60
        }
      });
    });
    

    /*tests to make*/
    it('exists', function() {
      expect(HomeController).toBeDefined();
    });

    it('check functions exist', function() {
      //httpBackend.flush();
      expect(HomeController.daily).toBeDefined();
      expect(HomeController.weekly).toBeDefined();
      expect(HomeController.monthly).toBeDefined();
      expect(HomeController.showTable).toBeDefined();
      /*function shouldnt be accessible*/
      expect(HomeController.getFailedRequest).not.toBeDefined();
    });

    it('getWeekly has been called', function(done) {
      spyOn(HomeController, 'getWeekly').and.callThrough();
      HomeController.getWeekly();
      done();
      /*HomeController.getWeekly({
        success: function() {
          console.log(HomeController.weekly);
          done();
        }
      });*/
      expect(HomeController.getWeekly).toHaveBeenCalled();
    });
    
    
    
  });
})();