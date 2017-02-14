(function(){
  'use strict';
  describe("Neo Service", function(){
    var NeoWsService;
    beforeEach(angular.mock.module('chrome-neo'));
    
    beforeEach(inject(function(_NeoWsService_) {
      NeoWsService = _NeoWsService_;
    }));
    
    it('exists', function(){
      expect(NeoWsService).toBeDefined();
    });
    it('has function', function(){
      NeoWsService.test(function(answer){
        expect(answer).toEqual(true);
      });
    });
  });
})();
