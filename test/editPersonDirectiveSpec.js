describe('Edit person directive', function() {
  var $compile,
      $rootScope,
      person,
      $q;

  var adaLovelace = {
      "info": {
        "name" : "Ada Lovelace"
      },
      "assessments": [
        {
          "category": "Photography",
          "ratings": [
            {
              "scores":
              {
                "Editing": 1,
                "Clicking": 3
              }
            }
          ]
        },
        {
          "category": "Cricket",
          "ratings": [
            {
              "scores":
              {
                "Bowling": 1
              }
            }
          ]
        }
      ]
  };

  beforeEach(module('blipApp'));
  beforeEach(module('scripts/edit-person.html'));
  beforeEach(module('scripts/view.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, Person, _$q_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    person = Person;
    $q = _$q_;
  }));

  it("should get the person's details", function() {
    spyOn(person, 'get').and.returnValue($q.when('someone'));
    var element = $compile('<edit-person></edit-person>')($rootScope);
    $rootScope.$digest();
    expect($rootScope.person).toBe('someone');
  });

  it("should save the person's details on save", function() {
    spyOn(person, 'get').and.returnValue($q.when('a person'));
    spyOn(person, 'save').and.returnValue($q.when({}));
    var element = $compile('<edit-person></edit-person>')($rootScope);
    $rootScope.$digest();

    $rootScope.save('william faulkner');

    expect(person.save.calls.argsFor(0)[0]).toBe('william faulkner');
  });

  it("should set saving flag", function() {
    spyOn(person, 'get').and.returnValue($q.when('a person'));
    spyOn(person, 'save').and.returnValue($q.when({}));
    var element = $compile('<edit-person></edit-person>')($rootScope);
    $rootScope.$digest();

    $rootScope.save('something');

    expect($rootScope.saving).toBeTruthy();
  });

  it("should reset saving flag when save is complete", function() {
    spyOn(person, 'get').and.returnValue($q.when('a person'));
    var element = $compile('<edit-person></edit-person>')($rootScope);
    $rootScope.$digest();
    spyOn(person, 'save').and.returnValue($q.when('something'));

    $rootScope.save('something');
    $rootScope.$digest();

    expect($rootScope.saving).toBeFalsy();
  });

  describe('add rating', function () {

    beforeEach(function () {
      spyOn(person, 'get').and.returnValue($q.when(adaLovelace));
      $compile('<edit-person></edit-person>')($rootScope);
      $rootScope.$digest();
    });

    it('should add a new rating with a date to the existing assessment', function () {
      var momentSpy = jasmine.createSpyObj('moment', ['format']);
      spyOn(window, 'moment').and.returnValue(momentSpy);
      momentSpy.format.and.returnValue('somedate');
      $rootScope.addRating(adaLovelace.assessments[0]);
      var ratings = $rootScope.person.assessments[0].ratings;
      expect(ratings[ratings.length - 1]).toEqual(jasmine.objectContaining({ratedAt: 'somedate'}));
    });

    it('should initialise a new array if the assessment has no ratings yet', function () {
      var assessment = {};
      $rootScope.addRating(assessment);
      expect(assessment.ratings.length).toBe(1);
    });

    it("should default to previous rating's skills when available", function () {
      $rootScope.addRating(adaLovelace.assessments[0]);
      var previousScores = $rootScope.person.assessments[0].ratings[0].scores;
      var newScores = $rootScope.person.assessments[0].ratings[1].scores;
      expect(Object.keys(newScores)).toEqual(Object.keys(previousScores));
    });

    it("should not default to previous rating's skills when no ratings exist", function () {
      expect(function () {
        $rootScope.addRating({});
      }).not.toThrow();
    });
  });

  describe('add skill', function () {

    beforeEach(function () {
      spyOn(person, 'get').and.returnValue($q.when(adaLovelace));
      $compile('<edit-person></edit-person>')($rootScope);
      $rootScope.$digest();
    });

    it('should add a new skill to the existing rating', function () {
      var newRating = { key: 'jumping', value: 99 };
      $rootScope.addSkill(adaLovelace.assessments[0].ratings[0], newRating);
      var rating = $rootScope.person.assessments[0].ratings[0];
      expect(rating.jumping).toBe(99);
    });

    it('should reset new rating after adding', function () {
      var newRating = { key: 'jumping', value: 99 };
      $rootScope.addSkill(adaLovelace.assessments[0].ratings[0], newRating);
      expect(newRating.key).toBeUndefined();
      expect(newRating.value).toBeUndefined();
    });
  });

  describe('remove skill', function () {

    beforeEach(function () {
      spyOn(person, 'get').and.returnValue($q.when(adaLovelace));
      $compile('<edit-person></edit-person>')($rootScope);
      $rootScope.$digest();
    });

    it('should remove skill from the rating scores', function () {
      var scores = {
        "Editing": 1,
        "Clicking": 3
      };
      $rootScope.removeSkill(scores, 'Editing');
      expect(Object.keys(scores)).not.toContain('Editing');
    });
  });

  describe('add assessment category', function () {

    beforeEach(function () {
      spyOn(person, 'get').and.returnValue($q.when(adaLovelace));
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

  describe('discard changes', function () {
    beforeEach(function () {
      spyOn(person, 'get').and.returnValue($q.when(adaLovelace));
      $compile('<edit-person></edit-person>')($rootScope);
      $rootScope.$digest();
    });

    it('should reload the page', inject(function ($window) {
      spyOn($window.location, 'reload');
      $rootScope.discardChanges();
      expect($window.location.reload).toHaveBeenCalled();
    }));
  });
});
