describe('Application config', function () {

  var Config;

  beforeEach(module('blipApp'));

  beforeEach(inject(function(_Config_) {
    Config = _Config_;
  }));

  it('should set the api url', function () {
    expect(Config.apiUrl).toBe('http://blip-api.herokuapp.com');
  });
});
