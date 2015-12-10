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
    };
  }));

  it('should instantiate ChartsJS with canvas element', function() {
    var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
    expect(chartSpy.calls.argsFor(0)[0]).toBe(element[0].getContext('2d'))
  });

  describe('when creating a radar chart', function () {
    it('should set scaleShowLabels', function() {
      var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
      $rootScope.$digest();
      expect(contextSpy.Radar.calls.argsFor(0)[1]).toEqual({scaleShowLabels: true});
    });

    it('should use the labels from the latest assessment', function() {
      var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
      $rootScope.$digest();
      expect(contextSpy.Radar.calls.argsFor(0)[0].labels).toEqual(['Grunt', 'Node', 'Angular', 'CSS']);
    });

    it('should use the most recent ratings', function() {
      var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
      $rootScope.$digest();
      expect(contextSpy.Radar.calls.argsFor(0)[0].datasets[0]).toEqual(jasmine.objectContaining({
        data: [5, 1, 5, 3]
      }));
    });

    it('should also add the previous ratings', function() {
      var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
      $rootScope.$digest();
      expect(contextSpy.Radar.calls.argsFor(0)[0].datasets[1]).toEqual(jasmine.objectContaining({
        data: [1, 1, 4, 2]
      }));
    });

    it('should not try to add a previous rating if there is only one', function() {
      $rootScope.assessment = {
        'ratings' : [
          {
            scores: {
              'Grunt': 1,
              'Node': 1,
              'Angular': 4,
              'CSS': 2
            },
          }
        ]
      };
      var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
      $rootScope.$digest();
      expect(contextSpy.Radar.calls.argsFor(0)[0].datasets.length).toBe(1);
    });

    it('should add formatting metadata for latest rating', function() {
      var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
      $rootScope.$digest();
      expect(contextSpy.Radar.calls.argsFor(0)[0].datasets[0]).toEqual(jasmine.objectContaining({
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)'
      }));
    });

    it('should add formatting metadata for previous rating', function() {
      var element = $compile('<canvas radar assessment="assessment"></canvas>')($rootScope);
      $rootScope.$digest();
      expect(contextSpy.Radar.calls.argsFor(0)[0].datasets[1]).toEqual(jasmine.objectContaining({
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)'
      }));
    });
  });
});
