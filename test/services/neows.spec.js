(function() {
  'use strict';
  describe("Neo Service", function() {
    var NeoWsService;
    var httpBackend;
    var constants;
    var $q;
    var $scope;
    /*global variable to change if we want to use the cache service or not*/
    var useCache;
    beforeEach(function(){
      angular.mock.module('chrome-neo');

      /*define mock CacheService*/
      var mockCacheService = {
        checkDaily: function(day, year){
          var differed = $q.defer();
          if(useCache) differed.resolve({foo: "bar"});
          else differed.resolve(null); //this will force NeoWsService to call API
          return differed.promise;
        },
        checkWeekly: function(week, year){
          var differed = $q.defer();
          if(useCache) differed.resolve({foo:"bar"});
          else differed.resolve(null);
          return differed.promise;
        },
        checkMonthly: function(month, year){
          var differed = $q.defer();
          if(useCache) differed.resolve({foo:"bar"});
          else differed.resolve(null);
          return differed.promise;
        },
        setDaily : function(day, year, object){
          var differed = $q.defer();
          differed.resolve({});
          return differed.promise;
        },
        setWeekly : function(week, year, object){
          var differed = $q.defer();
          differed.resolve({});
          return differed.promise;
        },
        setMonthly : function(month, year, object){
          var differed = $q.defer();
          differed.resolve({});
          return differed.promise;
        },
      };
      var globalCacheService = mockCacheService;
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
        .whenGET(/https:\/\/api\.nasa\.gov\/neo\/rest\/v1\/feed\/?.*/)
        //.whenGET(/.*/)
        .respond(200, {
          foo: 'barHTML'
        });
        //httpBackend.expectGET(/.*/);
        httpBackend.expectGET(/https:\/\/api\.nasa\.gov\/neo\/rest\/v1\/feed\/?.*/);
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
      it("not using cache", function(done) {
        useCache = false;
        NeoWsService.getDaily().then(function(response){
          expect(response).toEqual({foo:"barHTML"});
          done();
        });
        $scope.$apply();
        httpBackend.flush(); //need to flush http requests
        expect(NeoWsService.getDaily).toHaveBeenCalled();
      });
      it("using cache", function(done){
        useCache = true;
        NeoWsService.getDaily().then(function(response){
          expect(response).toEqual({foo:"bar"});
          done();
        });
        $scope.$apply();
        expect(NeoWsService.getDaily).toHaveBeenCalled();
      });
    });
    describe("get weekly", function(){
      beforeEach(function(){
        spyOn(NeoWsService, 'getWeekly').and.callThrough();
        useCache = true; //by default use the cache
      });
      it("not using cache", function(done){
        useCache = false;
        NeoWsService.getWeekly().then(function(response){
          expect(response).toEqual({foo:"barHTML"});
          done();
        });
        $scope.$apply();
        httpBackend.flush();
        expect(NeoWsService.getWeekly).toHaveBeenCalled();
      });
      it("with cache", function(done){
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
        useCache = true;
      });
      it("test call", function(){
        NeoWsService.getMonthly();
        expect(NeoWsService.getMonthly).toHaveBeenCalled();
      });
      it("not using cache", function(done){
        useCache = false;
        NeoWsService.getMonthly().then(function(response){
          //expect(response).toEqual({foo:'bar'});
          expect(response.element_count).toBeDefined();
          expect(response.near_earth_objects).toBeDefined();
          done();
        });
        $scope.$apply();
        httpBackend.flush();
        expect(NeoWsService.getMonthly).toHaveBeenCalled();
      });
      /*add test without cache!!*/
    });
  });
})();
