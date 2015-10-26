describe('Person directive', function() {
  var $compile,
      $rootScope,
      person;

  var adaLovelace = {
      "name" : "Ada Lovelace",
      "assessments": [
        {
          "category": "Photography",
          "ratings" : [
            {
            "Editing": 1
            }
          ]
        },
        {
          "category": "Cricket",
          "ratings" : [
            {
              "Bowling": 1
            }
          ]
        }
      ]
  };

  beforeEach(module('blipApp'));
  beforeEach(module('scripts/person.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, Person){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    person = Person;
  }));

  it("should get the person's details", function() {
    spyOn(person, 'get').and.returnValue('a person');
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect($rootScope.person).toBe('a person');
  });

  it("should display the person's name", function() {
    spyOn(person, 'get').and.returnValue(adaLovelace);
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect(element.find('h2').text()).toBe('Ada Lovelace');
  });

  it('should display the category name of each assessment a person has', function() {
    spyOn(person, 'get').and.returnValue(adaLovelace);
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect(element.find('h3').eq(0).text()).toBe('Photography');
    expect(element.find('h3').eq(1).text()).toBe('Cricket');
  });

  it('should include a canvas', function() {
    spyOn(person, 'get').and.returnValue(adaLovelace);
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('<canvas');
  });
});
