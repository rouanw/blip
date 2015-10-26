describe('Radar chart directive', function() {
  var $compile,
      $rootScope,
      chartSpy,
      contextSpy;

  beforeEach(module('blipApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    contextSpy = jasmine.createSpyObj('contextSpy', ['Radar']);
    chartSpy = spyOn(window, 'Chart');
    chartSpy.and.returnValue(contextSpy);
    $rootScope.assessment = {
      'ratings' : [
        {
          'Grunt': 1,
          'Node': 1,
          'Angular': 4,
          'CSS': 2
        },
        {
          'Grunt': 5,
          'Node': 1,
          'Angular': 5,
          'CSS': 3
        }
      ]
    };
  }));

  it('should instantiate ChartsJS with canvas element', function() {
    var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
    expect(chartSpy.calls.argsFor(0)[0]).toBe(element[0].getContext('2d'))
  });

  it('should create a radar using ChartsJS with scaleShowLabels set', function() {
    var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
    $rootScope.$digest();
    expect(contextSpy.Radar.calls.argsFor(0)[1]).toEqual({scaleShowLabels: true});
  });

  it('should create a radar using ChartsJS with correct labels', function() {
    var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
    $rootScope.$digest();
    expect(contextSpy.Radar.calls.argsFor(0)[0].labels).toEqual(['Grunt', 'Node', 'Angular', 'CSS']);
  });

  it('should create a radar using ChartsJS with most recent ratings', function() {
    var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
    $rootScope.$digest();
    expect(contextSpy.Radar.calls.argsFor(0)[0].datasets[0]).toEqual(jasmine.objectContaining({
      data: [5, 1, 5, 3]
    }));
  });
});
