describe('Person directive', function() {
  var $compile,
      $rootScope,
      person;

  beforeEach(module('blipApp'));
  beforeEach(module('scripts/person.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, Person, $httpBackend){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    person = Person;
  }));

  it('should get person details', function() {
    spyOn(person, 'get').and.returnValue({
      name: 'Marie Curie'
    });
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect(element.find('h2').text()).toBe('Marie Curie');
  });

  it("should display person's name", function() {
    spyOn(person, 'get').and.returnValue('a person');
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect($rootScope.person).toBe('a person');
  });
});