(function(){
  'use strict';
  describe("Cache Service", function() {
    var CacheService;
    var $q;
    var $scope;
    //notes: http://stackoverflow.com/questions/16565531/unit-testing-angularjs-factories-that-have-dependencies
    beforeEach(function(){
      angular.mock.module('chrome-neo');

      /*define mock localForage module*/
      var mockLocalForage = {
        getItem: function(key){
          var q = $q.defer();
          q.resolve({"key": key});
          return q.promise;
        },
        setItem: function(key, object){
          var q = $q.defer();
          q.resolve({
            "key": key,
            "object":object
          });
          return q.promise;
        }
      };
      module(function($provide){
        $provide.value('$localForage', mockLocalForage);
      });

      inject(function(_CacheService_, _$q_, $rootScope){
        $q = _$q_;
        $scope = $rootScope;
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
      expect(CacheService.setMonthly).toBeDefined();
    });
    /*Check Daily function*/
    describe("checkDaily", function(){
      beforeEach(function(){
        spyOn(CacheService, 'checkDaily').and.callThrough();
      });
      it('check daily called', function() {
        CacheService.checkDaily();
        expect(CacheService.checkDaily).toHaveBeenCalled();
      });
      it('check daily with arguments', function(){
        CacheService.checkDaily(1, 2017).then(function(response){
          expect(response).toEqual({"key": "Day_1_2017"});
        });
      });
    });
    describe("checkWeekly", function(){
      beforeEach(function(){
        spyOn(CacheService, 'checkWeekly').and.callThrough();
      });
      it('check weekly called', function(){
        CacheService.checkWeekly();
        expect(CacheService.checkWeekly).toHaveBeenCalled();
      });
      it('check weekly with arguments', function(){
        CacheService.checkWeekly(1, 2017).then(function(response){
          expect(response).toEqual({"key":"Week_1_2017"});
        });
      });
    });
    describe("checkMonthly", function(){
      beforeEach(function(){
        spyOn(CacheService, 'checkMonthly').and.callThrough();
      });
      it('check monthly called', function(){
        CacheService.checkMonthly();
        expect(CacheService.checkMonthly).toHaveBeenCalled();
      });
      it('check monthly with arguments', function(){
        CacheService.checkMonthly(1, 2017).then(function(response){
          expect(response).toEqual({"key":"Month_1_2017"});
        });
      });
    });
    describe("checkById", function(){
      beforeEach(function(){
        spyOn(CacheService, 'checkByID').and.callThrough();
      });
      it("check by Id called", function(){
        CacheService.checkByID();
        expect(CacheService.checkByID).toHaveBeenCalled();
      });
      it("check by Id with arguments", function(){
        CacheService.checkByID('KeyName').then(function(response){
          expect(response.toEqual({"key":"keyName"}));
        });
      });
    });
    describe("setByID", function(){
      beforeEach(function(){
        spyOn(CacheService, 'setByID').and.callThrough();
      });
      it("set by ID called", function(){
        CacheService.setByID();
        expect(CacheService.setByID).toHaveBeenCalled();
      });
      it("set by Id with arguments", function(done){
        CacheService.setByID(12345, {foo: 'bar'}).then(function(response){
          expect(response.key).toEqual("NEO_12345");
          expect(response.object).toEqual({foo: 'bar'});
          done();
        });
        $scope.$apply();
      });
    });
    describe("setDaily", function(){
      beforeEach(function(){
        spyOn(CacheService, 'setDaily').and.callThrough();
      });
      it("set daily", function(){
        CacheService.setDaily();
        expect(CacheService.setDaily).toHaveBeenCalled();
      });
      it("set daily with arguments", function(done){
        CacheService.setDaily(1, 2017, {foo: "bar"}).then(function(response){
          expect(response.key).toEqual("Day_1_2017");
          expect(response.object).toEqual({foo:'bar'});
          done();
        });
        $scope.$apply();
      });
    });
    describe("setWeekly", function(){
      beforeEach(function(){
        spyOn(CacheService, 'setWeekly').and.callThrough();
      });
      it('set Weekly', function(){
        CacheService.setWeekly();
        expect(CacheService.setWeekly).toHaveBeenCalled();
      });
      it('set weekly with arguments', function(done){
        CacheService.setWeekly(1, 2017, {foo:'bar'}).then(function(response){
          expect(response.key).toEqual('Week_1_2017');
          expect(response.object).toEqual({foo:'bar'});
          done();
        });
        $scope.$apply();
      });
      it('set bad weekly with arguments', function(done){
        CacheService.setWeekly(25, 2017,{foo:'bar'}).then(function(response){
          fail("Bad date was accepted");
          done();
        }).catch(function(reason){
          expect(reason).toBeDefined();
          done();
        });
        $scope.$apply();
      });
    });
    describe("setMonthly", function(){
      beforeEach(function(){
        spyOn(CacheService, 'setMonthly').and.callThrough();
      });
      it('set Monthly', function(){
        CacheService.setMonthly();
        expect(CacheService.setMonthly).toHaveBeenCalled();
      });
      it('set monthly with arguments', function(done){
        CacheService.setMonthly(1, 2017, {foo:'bar'}).then(function(response){
          expect(response.key).toEqual('Month_1_2017');
          expect(response.object).toEqual({foo:'bar'});
          done();
        });
        $scope.$apply();
      });
    });
  });
})();
