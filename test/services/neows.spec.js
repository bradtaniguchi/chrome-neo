(function() {
  'use strict';
  describe("Neo Service", function() {
    var NeoWsService;
    var httpBackend;
    var constants;
    var $q;
    var $scope;
    beforeEach(function(){
      angular.mock.module('chrome-neo');

      /*define mock CacheService*/
      var mockCacheService = {
        useCache : true, //we find it in cache and return foobar
        checkDaily: function(day, year){
          var differed = $q.defer();
          if(this.useCache) differed.resolve({foo: "bar"}); //not null!
          else differed.resolve(null); //this will force NeoWsService to call API
          return differed.promise;
        },
        checkWeekly: function(week, year){
          var differed = $q.defer();
          if(this.useCache) differed.resolve({foo:"bar"});
          else differed.resolve(null);
          return differed.promise;
        },
        checkMonthly: function(month, year){
          var differed = $q.defer();
          if(this.useCache)differed.resolve({foo:"bar"});
          else differed.resolve(null);
          return differed.promise;
        }
      };
      module(function($provide){
        $provide.value('CacheService', mockCacheService);
      });

      inject(function(_NeoWsService_, $httpBackend, _constants_, _$q_, $rootScope) {
        NeoWsService = _NeoWsService_;
        $scope = $rootScope;
        httpBackend = $httpBackend;
        constants = _constants_;
        $q = _$q_;
        httpBackend
        .whenGET(/.*/)
        .respond(200, {
          foo: 'barHTML'
        });
      });
    });

    it('exists', function() {
      expect(NeoWsService).toBeDefined();
    });

    it("check function exist", function(){
      expect(NeoWsService.getWeekly).toBeDefined();
      expect(NeoWsService.getDaily).toBeDefined();
      expect(NeoWsService.getMonthly).toBeDefined();
    });

    describe("get daily", function(){
      beforeEach(function(){
        spyOn(NeoWsService, 'getDaily').and.callThrough();
      });
      it("using cache", function(done) {
        NeoWsService.getDaily().then(function(response){
          expect(response).toEqual({foo:"bar"});
          done();
        });
        $scope.$apply();
        expect(NeoWsService.getDaily).toHaveBeenCalled();
      });
      /*in development
      it("not using cache", function(done){
        NeoWsService.getDaily().
      });*/
    });
    describe("get weekly", function(){
      beforeEach(function(){
        spyOn(NeoWsService, 'getWeekly').and.callThrough();
      });
      it("using cache", function(done){
        NeoWsService.getWeekly().then(function(response){
          expect(response).toEqual({foo:"bar"});
          done();
        });
        $scope.$apply();
        expect(NeoWsService.getWeekly).toHaveBeenCalled();
      });
    });
    describe("get monthly", function(){
      beforeEach(function(){
        spyOn(NeoWsService, 'getMonthly').and.callThrough();
      });
      it("test call", function(){
        NeoWsService.getMonthly();
        expect(NeoWsService.getMonthly).toHaveBeenCalled();
      });
    });
  });
})();
