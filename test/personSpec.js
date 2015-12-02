describe('Person', function () {

  require = jasmine.createSpy('require');
  JSON = jasmine.createSpyObj('JSON', ['parse']);
  angular = jasmine.createSpyObj('angular', ['toJson']);
  __dirname = 'dir';

  var person, httpBackend, rootScope;

  beforeEach(module('blipApp'));

  beforeEach(function () {
    fs = jasmine.createSpyObj('fs', ['readFileSync', 'writeFileSync']);
    require.and.returnValue(fs);
  });

  beforeEach(inject(function($httpBackend, Person, $rootScope){
    person = Person;
    httpBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  it('should get person over http and return promise', function () {
    var result = {someKey: 'value', uid: 'uid'};
    httpBackend.expectGET('http://localhost:5000/person').respond(200, result);
    var callback = jasmine.createSpy('callback');

    person.get().then(callback);
    httpBackend.flush();

    expect(callback).toHaveBeenCalledWith(result);

    rootScope.$digest();
  });

  it('should save person to file on save', function () {
    angular.toJson.and.returnValue('stringified');

    person.save('some json object');

    expect(fs.writeFileSync.calls.argsFor(0)).toEqual(['dir/person.json', 'stringified']);
  });

  it('should save person to file in a pretty format', function () {
    angular.toJson.and.returnValue('stringified');

    person.save('some json object');

    expect(angular.toJson.calls.argsFor(0)).toEqual(['some json object', true]);
  });
});
