(function() {
  'use strict';
  describe("Home controller", function() {
    var HomeController;
    var $q;
    beforeEach(angular.mock.module('chrome-neo'));
    
    beforeEach(inject(function($controller) {
      HomeController = $controller('HomeController');
      
      spyOn(HomeController, '$onInit').and.callThrough();
      HomeController.$onInit();

    }));

    /*tests to make*/
    it('exists', function() {
      expect(HomeController).toBeDefined();
    });

    it('check weekly/daily/monthly exists', function() {
      expect(HomeController.daily).toBeDefined();
      expect(HomeController.weekly).toBeDefined();
      expect(HomeController.monthly).toBeDefined();
    });

    it('init has been called', function() {
      expect(HomeController.$onInit).toHaveBeenCalled();
    });
  });
})();