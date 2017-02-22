(function(){
  'use strict';
  describe("help-dialog", function(){
    var HelpDialogController;
    beforeEach(function(){
      angular.mock.module('chrome-neo');
      inject(function($controller){
        HelpDialogController = $controller('HelpDialogController');
      });
    });
    /*tests to make*/
    it('exists', function(){
      expect(HelpDialogController).toBeDefined();
    });

    it('check scope variables exist', function() {
      expect(HelpDialogController.list).toBeDefined();
      expect(HelpDialogController.definitions).toBeDefined();
    });

    it('check functions exist', function(){
      expect(HelpDialogController.close).toBeDefined();
    });

  });
})();
