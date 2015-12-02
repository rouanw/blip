describe('Person directive', function() {
  var $compile,
      $rootScope,
      person,
      q;

  var adaLovelace = {
      info: {
        "name" : "Ada Lovelace"
      },
      "assessments": [
        {
          "category": "Photography",
          "ratings" : [
            {
              scores: {
                'Grunt': 1,
                'Node': 1,
                'Angular': 4,
                'CSS': 2
              },
            },
            {
              scores: {
                'Grunt': 5,
                'Node': 1,
                'Angular': 5,
                'CSS': 3
              }
            }
          ]
        },
        {
          "category": "Cricket",
        "ratings" : [
            {
              scores: { "Bowling": 1 }
            }
          ]
        }
      ]
  };

  beforeEach(module('blipApp'));
  beforeEach(module('scripts/person.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, Person, $q) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    person = Person;
    q = $q;
  }));

  it("should get the person's details", function() {
    spyOn(person, 'get').and.returnValue(q.when('a person'));
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect($rootScope.person).toBe('a person');
  });

  it("should set the person object to a temporary skeleton to avoid chartsjs quirck and display charts correctly", function() {
    spyOn(person, 'get').and.returnValue(q.reject(''));
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect($rootScope.person).not.toBeUndefined();
    expect($rootScope.person.assessments.length).toBe(1);
    expect($rootScope.person.assessments[0].ratings.length).toBe(1);
    expect($rootScope.person.assessments[0].ratings[0].scores).not.toBeUndefined();
  });


  it("should display the person's name", function() {
    spyOn(person, 'get').and.returnValue(q.when(adaLovelace));
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect(element.find('h2').text()).toBe('Ada Lovelace');
  });

  it('should display the category name of each assessment a person has', function() {
    spyOn(person, 'get').and.returnValue(q.when(adaLovelace));
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect(element.find('h3').eq(0).text()).toBe('Photography');
    expect(element.find('h3').eq(1).text()).toBe('Cricket');
  });

  it('should include a canvas', function() {
    spyOn(person, 'get').and.returnValue(q.when(adaLovelace));
    var element = $compile('<person></person>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('<canvas');
  });

  describe('hasEnoughSkillsForRadar', function () {
    beforeEach(function () {
      spyOn(person, 'get').and.returnValue(q.when());
      var element = $compile('<person></person>')($rootScope);
      $rootScope.$digest();
    });

    it("should return true if assessment's most recent rating has more than 2 skills", function() {
      var assessment = {
        ratings: [
          {
            "scores": {
              "skill1": 3,
              "skill2": 3,
              "skill3": 3
            }
          }
        ]
      };
      expect($rootScope.hasEnoughSkillsForRadar(assessment)).toBeTruthy();
    });

    it("should return false if assessment's most recent rating has fewer than 3 skills", function() {
      var assessment = {
      ratings: [
        {
          "scores": {
            "skill2": 3,
            "skill3": 3
          }
        }
      ]};
      expect($rootScope.hasEnoughSkillsForRadar(assessment)).toBeFalsy();
    });

    it("should return false if assessment's has no ratings property", function() {
      var assessment = {};
      expect($rootScope.hasEnoughSkillsForRadar(assessment)).toBeFalsy();
    });
  });
});
