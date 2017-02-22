(function() {
  'use strict';
  describe("Asterank Service", function() {
    var AsterankService;
    var httpBackend;
    var constants;
    beforeEach(function(){
      angular.mock.module('chrome-neo');
      inject(function(_AsterankService_, $httpBackend, _constants_){
        AsterankService = _AsterankService_;
        httpBackend = $httpBackend;
        constants = _constants_;

      });
    });

    it('exists', function() {
      expect(AsterankService).toBeDefined();
    });

    it('check functions exist', function(){
      expect(AsterankService.getById).toBeDefined();
      expect(AsterankService.getByName).toBeDefined();
    });

    it("check getById", function(done){
      var data;
      httpBackend
        .when('GET', constants.ASTERANK_BASE_URL+"?limit=1&query=%7B%22spkid%22:0%7D")
        //.when('GET', constants.ASTERANK_BASE_URL+"?/limit=[0-9]*&query=.*")
        .respond(200, {
          foo: 'bar'
        });

      AsterankService.getById(0,1).then(function(response){
        expect(response).toBeDefined();
        expect(response.data.foo).toEqual("bar");
        done();
      });
      httpBackend.flush();
    });

  });
})();
