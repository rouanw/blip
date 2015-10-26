describe('Person', function () {

  __dirname = 'dir/';

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
    fs.readFileSync.and.returnValue(expectedObject);
    require.and.returnValue(fs);

    expect(person.get()).toBe(expectedObject);
    expect(fs.readFileSync.calls.argsFor(0)[0]).toBe('dir/data/person.json');
  });
});
