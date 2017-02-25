(function(){
  'use strict';
  describe("About controller", function(){
    var AboutController;
    beforeEach(function(){
      angular.mock.module('chrome-neo');
      
      inject(function($controller, $injector){
        AboutController = $controller('AboutController');
      });
    });
    
    /*tests to make*/
    it('exists', function(){
      expect(AboutController).toBeDefined();
    });
    
    it('check functions exist', function(){
      expect(AboutController.techInit).not.toBeDefined();
    });
  });
})();