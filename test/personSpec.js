describe('Person', function () {

  require = jasmine.createSpy('require');
  JSON = jasmine.createSpyObj('JSON', ['parse']);
  angular = jasmine.createSpyObj('angular', ['toJson']);
  __dirname = 'dir';

  var person, fs;

  beforeEach(function () {
    fs = jasmine.createSpyObj('fs', ['readFileSync', 'writeFileSync']);
    require.and.returnValue(fs);
  });

  beforeEach(module('blipApp'));

  beforeEach(inject(function(Person){
    person = Person;
  }));

  it('should load person from file', function () {
    var expectedObject = {
      someKey: 'someValue'
    };
    fs.readFileSync.and.returnValue('fileData');
    JSON.parse.and.returnValue(expectedObject);

    expect(person.get()).toBe(expectedObject);
    expect(fs.readFileSync.calls.argsFor(0)[0]).toBe('dir/data/person.json');
    expect(JSON.parse.calls.argsFor(0)[0]).toBe('fileData');
  });

  it('should save person to file on save', function () {
    angular.toJson.and.returnValue('stringified');

    person.save('some json object');

    expect(fs.writeFileSync.calls.argsFor(0)).toEqual(['dir/data/person.json', 'stringified']);
  });
});
