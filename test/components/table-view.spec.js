(function(){
  'use strict';
  describe("table-dialog", function(){
    var TableViewController;
    beforeEach(function(){
      angular.mock.module('chrome-neo');
      inject(function($controller){
        var mockInitData = {};
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
    });
  });
})();
