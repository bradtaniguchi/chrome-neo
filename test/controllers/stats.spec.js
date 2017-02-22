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
      expect(StatsController.openMenu).toBeDefined(); //needs dependencies
      expect(StatsController.changeStat).toBeDefined();
      expect(StatsController.getNeos).toBeDefined();
      expect(StatsController.changeStat).toBeDefined();
      expect(StatsController.openMenu).toBeDefined();
      expect(StatsController.addFilter).toBeDefined();
      expect(StatsController.removeFilter).toBeDefined();
    });
    it("check addFilter", function(){
      StatsController.addFilter("filterName", "filterValue");
      /*check to see if it did it*/
      expect(StatsController.filters[0]).toBeDefined();
      expect(StatsController.filters.length).toEqual(1);
      expect(StatsController.filters[0].filterName).toEqual("filterName");
      //expect(StatsController.filters.filterValue).toEqual("filterValue");
    });
    it("check removeFilter", function(){
      StatsController.addFilter("filterName", "filterValue");
      StatsController.removeFilter(0);

      expect(StatsController.filters[0]).not.toBeDefined();
      expect(StatsController.filters.length).toEqual(0);
    });
  });
})();
