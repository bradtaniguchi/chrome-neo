(function() {
  'use strict';
  //http://www.syntaxsuccess.com/viewarticle/how-to-mock-http-calls-in-angular
  describe("Home controller", function() {
    var HomeController;
    beforeEach(function() {
      angular.mock.module('chrome-neo');
      
      var mockNeowsService = {}; //mocked service
      
      inject(function($controller, $injector) {
        HomeController = $controller('HomeController', {NeoWsService: mockNeowsService});
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

    /*it('getWeekly has been called', function(done) {
      spyOn(HomeController, 'getWeekly').and.callThrough();
      HomeController.getWeekly();
      done();
      expect(HomeController.getWeekly).toHaveBeenCalled();
    });*/
    
    
    
  });
})();