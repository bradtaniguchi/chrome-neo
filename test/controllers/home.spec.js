(function() {
  'use strict';
  //http://www.syntaxsuccess.com/viewarticle/how-to-mock-http-calls-in-angular
  describe("Home controller", function() {
    var HomeController;
    beforeEach(function() {
      angular.mock.module('chrome-neo');


      inject(function($controller, $injector, $q) {
        /*define mocks*/
        var mockNeowsService = {
          getDaily : function(){
            var differed = $q.defer();
            differed.resolve({element_count: 25});
            return differed.promise;
          }
        };
        var mockCacheService = {};

        /*define controller to test*/
        HomeController = $controller('HomeController', {
            NeoWsService: mockNeowsService,
            CacheService : mockCacheService
        });
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
      expect(HomeController.getDaily).toBeDefined();
      expect(HomeController.getWeekly).toBeDefined();
      expect(HomeController.getMonthly).toBeDefined();
    });

    it('getWeekly has been called', function() {
      spyOn(HomeController, 'getWeekly').and.callThrough();
      HomeController.getWeekly();
      expect(HomeController.getWeekly).toHaveBeenCalled();
    });

    describe("getDaily has been called", function() {
      beforeEach(function(){
        spyOn(HomeController, 'getDaily').and.callThrough();
        HomeController.getDaily();
      });
      it("test call", function(){
        expect(HomeController.getDaily).toHaveBeenCalled();
      });
    });
  });
})();
