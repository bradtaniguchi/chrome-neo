(function() {
  'use strict';
  describe("Neo Service", function() {
    var NeoWsService;
    var httpBackend;
    var constants;
    beforeEach(function(){
      angular.mock.module('chrome-neo');

      /*define mock localForage Module*/
      var mockLocalForage = {};
      module(function($provide){
        $provide.value('$localForage', mockLocalForage);
      });
    });

    beforeEach(inject(function(_NeoWsService_, $httpBackend, _constants_) {
      NeoWsService = _NeoWsService_;
      httpBackend = $httpBackend;
      constants = _constants_;
      httpBackend
        //.when('GET', constants.NEOWS_BASE_URL+"/.*/")
        .whenGET(/.*/)
        .respond(200, { //update with real data
          foo: 'bar'
        });
    }));

    it('exists', function() {
      expect(NeoWsService).toBeDefined();
    });

    it("check function exist", function(){
      expect(NeoWsService.getWeekly).toBeDefined();
      expect(NeoWsService.getDaily).toBeDefined();
      expect(NeoWsService.getMonthly).toBeDefined();
    });

    /*this is just a test function that does nothing*/
    it('has test function', function() {
      NeoWsService.test(function(answer) {
        expect(answer).toEqual(true);
      });
    });

    /* BEING DEVELOPED
    it('Can connect', function(done) {
      NeoWsService.getWeekly().then(function(response) {
        console.log(response);
        expect(response).toBeDefined();
        done();
      });
    });*/
  });
})();
