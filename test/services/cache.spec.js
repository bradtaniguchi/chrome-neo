(function(){
  'use strict';
  describe("Cache Service", function() {
    var CacheService;
    //notes: http://stackoverflow.com/questions/16565531/unit-testing-angularjs-factories-that-have-dependencies
    beforeEach(function(){
      angular.mock.module('chrome-neo');

      /*define mock localForage module*/
      var mockLocalForage = {};
      module(function($provide){
        $provide.value('$localForage', mockLocalForage);
      });

      inject(function(_CacheService_){
        CacheService = _CacheService_;
      });

    });

    it('exists', function() {
      expect(CacheService).toBeDefined();
    });

    it('check functions exist', function() {
      expect(CacheService.checkDaily).toBeDefined();
      expect(CacheService.checkWeekly).toBeDefined();
      expect(CacheService.checkMonthly).toBeDefined();
      expect(CacheService.checkByID).toBeDefined();
    });

  });
})();
