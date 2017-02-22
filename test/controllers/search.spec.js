(function(){
  'use strict';
  describe("Search controller", function(){
    var SearchController;
    beforeEach(function(){
      angular.mock.module('chrome-neo');
      inject(function($controller){
        SearchController = $controller('SearchController');
      });
    });

    it('exists', function(){
      expect(SearchController).toBeDefined();
    });

    it("check functions exist", function(){
      expect(SearchController.search).toBeDefined();
    });
  });
})();
