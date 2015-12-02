describe('authenticated directive', function() {

  beforeEach(module('blipApp'));

  var $cookies, $rootScope;

  beforeEach(inject(function(_$rootScope_, _$cookies_) {
    $rootScope = _$rootScope_;
    $cookies = _$cookies_;
  }));

  describe('rootScope.authenticated', function () {
    it("should return use the right cookie name", function() {
      spyOn($cookies, 'get').and.returnValue(undefined);
      $rootScope.authenticated();
      expect($cookies.get).toHaveBeenCalledWith('blipsession')
    });

    it("should return false when cookie is not set", function() {
      spyOn($cookies, 'get').and.returnValue(undefined);
      expect($rootScope.authenticated()).toBeFalsy();
    });

    it("should return true when cookie is set", function() {
      spyOn($cookies, 'get').and.returnValue('acookie');
      expect($rootScope.authenticated()).toBeTruthy();
    });
  });
});
