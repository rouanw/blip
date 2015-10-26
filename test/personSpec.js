describe('Person', function () {

  __dirname = 'dir';
  JSON = jasmine.createSpyObj('JSON', ['parse']);

  var person;

  beforeEach(module('blipApp'));

  beforeEach(inject(function(Person){
    person = Person;
  }));

  it('should load person from file', function () {
    var expectedObject = {
      someKey: 'someValue'
    };
    var fs = jasmine.createSpyObj('fs', ['readFileSync']);
    fs.readFileSync.and.returnValue('fileData');
    require.and.returnValue(fs);
    JSON.parse.and.returnValue(expectedObject);

    expect(person.get()).toBe(expectedObject);
    expect(fs.readFileSync.calls.argsFor(0)[0]).toBe('dir/data/person.json');
    expect(JSON.parse.calls.argsFor(0)[0]).toBe('fileData');
  });
});
