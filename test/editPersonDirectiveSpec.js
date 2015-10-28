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

  describe('add rating', function () {

    beforeEach(function () {
      spyOn(person, 'get').and.returnValue(adaLovelace);
      $compile('<edit-person></edit-person>')($rootScope);
      $rootScope.$digest();
    });

    it('should add a new rating to the existing assessment', function () {
      $rootScope.addRating(adaLovelace.assessments[0]);
      var ratings = $rootScope.person.assessments[0].ratings;
      expect(ratings[ratings.length - 1]).toEqual({});
    });

    it('should initialise a new array if the assessment has no ratings yet', function () {
      var assessment = {};
      $rootScope.addRating(assessment);
      expect(assessment.ratings.length).toBe(1);
    });
  });

  describe('add skill', function () {

    beforeEach(function () {
      spyOn(person, 'get').and.returnValue(adaLovelace);
      $compile('<edit-person></edit-person>')($rootScope);
      $rootScope.$digest();
    });

    it('should add a new skill to the existing rating', function () {
      $rootScope.addSkill(adaLovelace.assessments[0].ratings[0], 'jumping', 99);
      var rating = $rootScope.person.assessments[0].ratings[0];
      expect(rating.jumping).toBe(99);
    });
  });

  describe('add assessment category', function () {

    beforeEach(function () {
      spyOn(person, 'get').and.returnValue(adaLovelace);
      $compile('<edit-person></edit-person>')($rootScope);
      $rootScope.$digest();
    });

    it('should add a new assessment to the existing person', function () {
      $rootScope.addAssessment(adaLovelace);
      var assessments = $rootScope.person.assessments;
      expect(assessments[assessments.length - 1]).toEqual({});
    });

    it("should create an assessments array if one doesn't exist", function () {
      var person = {};
      $rootScope.addAssessment(person);
      expect(person.assessments.length).toBe(1);
    });
  });
});
