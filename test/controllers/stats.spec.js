(function(){
  'use strict';
  describe("Stats controller", function(){
    var StatsController;
    beforeEach(function(){
      angular.mock.module('chrome-neo');
      inject(function($controller){
        StatsController = $controller('StatsController');
      });
    });
    
    /*tests to make*/
    it('exists', function(){
      expect(StatsController).toBeDefined();
    });
    
    it('check functions exist', function(){
      //expect(StatsController.openMenu.toBeDefined(); //needs dependencies
      expect(StatsController.changeStat).toBeDefined();
      expect(StatsController.getNeos).toBeDefined();
    });
  });
})();