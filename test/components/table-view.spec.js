(function(){
  'use strict';
  describe("table-dialog", function(){
    var TableViewController;
    beforeEach(function(){
      angular.mock.module('chrome-neo');
      inject(function($controller){
        var mockInitData = {
          data: {
            element_count : 66,
            near_earth_objects: {}
          },
          xAttribute : ''
        };
        TableViewController = $controller("TableViewController", {initData: mockInitData});
      });
    });
    /*tests to make*/
    it('exists', function(){
      expect(TableViewController).toBeDefined();
    });

    it('check scope variables exist', function(){
      expect(TableViewController.chart).toBeDefined();
    });

    it('check functions exist', function(){
      expect(TableViewController.close).toBeDefined();
      expect(TableViewController.updateChart).toBeDefined();
      expect(TableViewController.chartClick).toBeDefined();
    });
    
    describe('Update chart tes', function(){
      
    });
  });
})();
