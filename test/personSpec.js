describe('Person', function () {

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

  it('should return and set unauthenticated flag on root scope when no person is returned', function () {
    var result = {someKey: 'value'};
    httpBackend.expectGET('http://localhost:5000/person').respond(200, result);
    var callback = jasmine.createSpy('callback');

    person.get().then(callback);
    httpBackend.flush();

    expect(callback).toHaveBeenCalledWith(undefined);
    expect(rootScope.unauthenticated).toBeTruthy();

    rootScope.$digest();
  });

  it('should save person over http', function () {
    var fred = { name: 'bob', assessments: ['an assessment'] };
    httpBackend.expectPUT('http://localhost:5000/assessments', fred.assessments).respond(200, {});

    person.save(fred);

    httpBackend.flush();
  });

  it('should return promise on save', function () {
    var fred = { assessments: [] };
    var response = {};
    httpBackend.when('http://localhost:5000/assessments', fred.assessments).respond(200, response);

    var promise = person.save(fred);

    expect(promise).toBeTruthy('promise should be returned');
    expect(promise.then instanceof Function).toBeTruthy('should be a promise');
  });
});
