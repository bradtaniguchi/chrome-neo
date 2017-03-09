(function() {
  'use strict';
  describe("Asterank Service", function() {
    var AsterankService;
    var httpBackend;
    var constants;
    var $q;
    var $scope;
    var useCache;
    beforeEach(function(){
      angular.mock.module('chrome-neo');

      var mockCacheService ={
        checkByID : function(id){
          var differed = $q.defer();
          if(useCache) differed.resolve({foo:"bar"});
          else differed.resolve(null);
          return differed.promise;
        },
        setByID : function(spkId, object){
          var differed = $q.defer();
          differed.resolve();
          return differed.promise;
        }

      };
      module(function($provide){
        $provide.value("CacheService", mockCacheService);
      });

      inject(function(_AsterankService_, $httpBackend, _constants_,
        _$q_, $rootScope){
        AsterankService = _AsterankService_;
        httpBackend = $httpBackend;
        constants = _constants_;
        $q = _$q_;
        $scope = $rootScope;

        httpBackend
        .when('GET', /.*/) //capture all requests
        .respond(200, {
          foo: 'bar'
        });
      });
    });

    it('exists', function() {
      expect(AsterankService).toBeDefined();
    });

    it('check functions exist', function(){
      expect(AsterankService.getById).toBeDefined();
      expect(AsterankService.getByName).toBeDefined();
    });

    describe("getById", function(){
      //beforeEach(function(){});
      it("check getById, using cache", function(done){
        useCache = true;
        AsterankService.getById(0,1).then(function(response){
          expect(response).toBeDefined();
          expect(response.foo).toEqual("bar");
          done();
        });
        $scope.$apply();
      });
      // it("check getById, not using cache", function(done){
      //   useCache = false;
      //   AsterankService.getById(0,1).then(function(response){
      //       expect(response).toBeDefined();
      //       done();
      //   });
      //   $scope.$apply();
      // });
    });
  });
})();
