fdescribe('Sign in directive', function() {
  var $compile,
      $rootScope,
      element,
      httpBackend;

  beforeEach(module('blipApp'));
  beforeEach(module('scripts/sign-in.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    httpBackend = $httpBackend;
    element = $compile('<sign-in></sign-in>')($rootScope);
    $rootScope.$digest();
  }));

  it('calls to authenticate with provider when sign in for that provider is clicked', function() {
    httpBackend.expectGET('http://localhost:5000/auth/github').respond(200, {});
    element.find('a').triggerHandler('click');
    httpBackend.flush();
  });
});
