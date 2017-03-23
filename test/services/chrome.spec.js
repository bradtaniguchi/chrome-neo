(function(){
  'use strict';
  describe('Chrome Service', function(){
    var ChromeService;
    beforeEach(function(){
      var mockWindow = {
              innerHeight: 400,
              innerWidth: 500,
              open: function(link, str) {}//so function exists
      };
      var mockChrome = {
        tabs: {
          create : function(url){}
        }
      };
      module(function($provide){
        //$provide.value('$window', mockWindow);
        //$provide.value('chrome', mockChrome);
      });

      angular.mock.module('chrome-neo');

      inject(function(_ChromeService_){
        ChromeService = _ChromeService_;
      });
    });
    it('exists', function(){
      expect(ChromeService).toBeDefined();
    });
    it('functions exist',function(){
      expect(ChromeService.link).toBeDefined();
    });
  });
})();
