(function(){
  'use strict';
  describe("RankIt Serivce", function(){
    var RankItService;
    var $q;
    var $scope;
    beforeEach(function(){
      angular.mock.module('chrome-neo');

      inject(function(_RankItService_, _$q_, $rootScope){
        $q = _$q_;
        $scope = $rootScope;
        RankItService = _RankItService_;
      });
    });
    it('exists', function(){
      expect(RankItService).toBeDefined();
    });
    it('check if functions exist', function(){
      expect(RankItService.getBest).toBeDefined();
      expect(RankItService.getSorted).toBeDefined();
      expect(RankItService.getWorst).toBeDefined();
    });
    describe('getBest', function(){
      /*describe dynamic test cases*/
      var entries = [
        [], //empty test case
        [{name:'one', size:300},{name:'two', size:500},{name:'three', size: 100}],
        [
          {name:'one', size:300},{name:'two', size:500},{name:'three', size: 100},
          {name:'four', size:1000},{name:'five', size:25},{name:'six', size:9001}
        ]
      ];
      var attribute = 'size'; //give an actual attribute for an NEO later
      var results = [//todo update to just the name that is the largest
        {},
        {name:'two', size:500},
        {name:'six', size:9001}
      ];

      beforeEach(function(){
        spyOn(RankItService, 'getBest').and.callThrough();
      });
      /*setup dynamic test generation*/
      results.forEach(function(result, index, array){
        it('checking : ' + index, function(done){
          RankItService.getBest(entries[index], attribute).then(function(best){
            expect(best).toEqual(results[index]);
            done();
          });
          $scope.$apply();
        });
      });
    });
    describe('merge_sort', function(){
      it('test', function(){
        var entries = [{size:100},{size:500},{size:300}, {size:700}, {size:50}];
        var attribute = 'size';
        /*smallest to largest*/
        var expectedResult = [{size:50}, {size:100},{size:300},{size:500}, {size:700}];
        var result = RankItService.merge_sort(entries, attribute);
        expect(result).toEqual(expectedResult);
      });
    });
    describe('filterDangerous', function(){
      var entires = [
        {is_potentially_hazardous_asteroid: false},
        {is_potentially_hazardous_asteroid: true},
        {is_potentially_hazardous_asteroid: false}
      ];
      it('test', function(){
        var result = RankItService.filterDangerous(entires);
        expect(result.length).toEqual(1);
      });
    });
  });
})();
