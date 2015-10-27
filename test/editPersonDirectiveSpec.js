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
  beforeEach(module('scripts/edit-person.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, Person){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    person = Person;
  }));

  it("should get the person's details", function() {
    spyOn(person, 'get').and.returnValue('someone');
    var element = $compile('<edit-person></edit-person>')($rootScope);
    $rootScope.$digest();
    expect($rootScope.person).toBe('someone');
  });

  it("should save the person's details on save", function() {
    spyOn(person, 'get').and.returnValue('a person');
    spyOn(person, 'save');
    var element = $compile('<edit-person></edit-person>')($rootScope);
    $rootScope.$digest();

    $rootScope.save('william faulkner');
    
    expect(person.save.calls.argsFor(0)[0]).toBe('william faulkner');
  });
});