(function() {
  'use strict';
  describe("Asterank Service", function() {
    var AsterankService;
    var httpBackend;
    var constants;
    beforeEach(angular.mock.module('chrome-neo'));

    beforeEach(inject(function(_AsterankService_, $httpBackend, _constants_) {
      AsterankService = _AsterankService_;
      httpBackend = $httpBackend;
      constants = _constants_;
      console.log("constants provided: " + constants.ASTERANK_BASE_URL);
      httpBackend
        .when('GET', constants.ASTERANK_BASE_URL)
        .respond(200, {
          foo: 'bar'
        });
    }));

    it('exists', function() {
      expect(AsterankService).toBeDefined();
    });
  });
})();
