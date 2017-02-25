(function(){
  'use strict';
  describe("Cache Service", function() {
    var CacheService;
    //notes: http://stackoverflow.com/questions/16565531/unit-testing-angularjs-factories-that-have-dependencies
    beforeEach(function(){
      angular.mock.module('chrome-neo');

      /*define mock localForage module*/
      var mockLocalForage = {
        getItem: function(){ 
          var q = $q.differ();
          q.resolve({foo: 'bar'});
          return q.promis;
          
        }
      };
      module(function($provide){
        $provide.value('$localForage', mockLocalForage);
      });

      inject(function(_CacheService_, $q){
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
      expect(CacheService.setDaily).toBeDefined();
      expect(CacheService.setWeekly).toBeDefined();
    });
    
    /* fix promise return!
    it('check daily', function(){
      spyOn(CacheService, 'checkDaily').and.callThrough();
      CacheService.checkDaily();
      expect(CacheService.checkDaily).toHaveBeenCalled();
      
    });
    */

  });
})();
