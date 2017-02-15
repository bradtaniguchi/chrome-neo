(function() {
  'use strict';
  describe("Neo Service", function() {
    var NeoWsService;
    var httpBackend;
    var constants;
    beforeEach(angular.mock.module('chrome-neo'));

    beforeEach(inject(function(_NeoWsService_, $httpBackend, _constants_) {
      NeoWsService = _NeoWsService_;
      httpBackend = $httpBackend;
      constants = _constants_;
      httpBackend
        .when('GET', constants.NEOWS_BASE_URL)
        .respond(200, { //update with real data
          foo: 'bar'
        });
    }));

    it('exists', function() {
      expect(NeoWsService).toBeDefined();
    });

    /*this is just a test function that does nothing*/
    it('has function', function() {
      NeoWsService.test(function(answer) {
        expect(answer).toEqual(true);
      });
    });

    it('Can connect', function() {
      var res;
      NeoWsService.getWeekly().then(function(response) {
        res = response;
        expect(res).toBeDefined();
      });
    });
  });
})();
