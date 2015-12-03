describe('Sign in directive', function() {
  var $compile,
      $rootScope,
      element,
      httpBackend,
      browserWindow,
      authWindow,
      $q,
      $cookies;

  beforeEach(module('blipApp'));
  beforeEach(module('scripts/sign-in.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend, _$q_, _$cookies_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    httpBackend = $httpBackend;
    $q = _$q_;
    $cookies = _$cookies_;
    element = $compile('<sign-in></sign-in>')($rootScope);
    $rootScope.$digest();
    var remote = jasmine.createSpyObj('remote', ['require']);
    browserWindow = jasmine.createSpy('BrowserWindow');
    authWindow = {
      loadUrl: jasmine.createSpy('loadUrl'),
      webContents: {
        on: jasmine.createSpy('webContentsOn'),
        session: {
          cookies: jasmine.createSpyObj('cookies', ['get'])
        }
      },
      on: jasmine.createSpy('on'),
      close: jasmine.createSpy('close')
    };
    browserWindow.and.returnValue(authWindow);
    remote.require.and.returnValue(browserWindow);
    require.and.returnValue(remote);
  }));

  describe('sign in', function () {

    it('calls to authenticate with provider when sign in is clicked', function() {
      httpBackend.expectGET('http://blip-api.herokuapp.com/auth/twitter').respond(200, {});
      $rootScope.signIn('twitter')
      httpBackend.flush();
    });

    it('calls to authenticate with provider when sign in is clicked', function() {
      httpBackend.expectGET('http://blip-api.herokuapp.com/auth/blah').respond(200, {});
      $rootScope.signIn('blah')
      httpBackend.flush();
    });

    describe('when the response is received', function () {
      beforeEach(function () {
        httpBackend.expectGET('http://blip-api.herokuapp.com/auth/twitter').respond(200, $q.when({}));
      });

      it('should set authenticating to true', function () {
        $rootScope.signIn('twitter');
        httpBackend.flush();
        expect($rootScope.authenticating).toBeTruthy();
      });

      it('should create a new browser window', function () {
        $rootScope.signIn('twitter');
        httpBackend.flush();
        expect(browserWindow).toHaveBeenCalledWith({ width: 800, height: 600, 'node-integration': false, title: 'Sign in to Blip' });
      });

      it('should open a new window for the user to authenticate in', function () {
        $rootScope.signIn('twitter');
        httpBackend.flush();
        expect(authWindow.loadUrl).toHaveBeenCalledWith('http://blip-api.herokuapp.com/auth/twitter');
      });

      it('should register a callback for when the authWindow is closed', function () {
        $rootScope.signIn('twitter');
        httpBackend.flush();
        expect(authWindow.on).toHaveBeenCalledWith('closed', jasmine.any(Function));
      });

      describe('authWindow close callback', function () {
        var callback;
        beforeEach(function (){
          $rootScope.signIn('twitter');
          httpBackend.flush();
          callback = authWindow.on.calls.argsFor(0)[1];
        });

        it('should set authenticating to false', function () {
          callback('', '', 'http://somewhere/auth/twitter/callback');
          expect($rootScope.authenticating).toBeFalsy();
        });

        it('should initiate a digest cycle', function () {
          spyOn($rootScope, '$digest');
          callback('', '', 'http://somewhere/auth/twitter/callback');
          expect($rootScope.$digest).toHaveBeenCalled();
        });
      });

      it('should register a callback for when the webContents of the authWindow has successfully completed an HTPP GET', function () {
        $rootScope.signIn('twitter');
        httpBackend.flush();
        expect(authWindow.webContents.on).toHaveBeenCalledWith('did-get-response-details', jasmine.any(Function));
      });

      describe('webContents did-get-response-details callback', function () {
        var callback;
        beforeEach(function () {
          $rootScope.signIn('twitter');
          httpBackend.flush();
          callback = authWindow.webContents.on.calls.argsFor(0)[1];
        });

        it('should close the authentication window when url fetched is the auth callback', function () {
          spyOn($rootScope, '$digest');
          callback('', '', 'http://somewhere/auth/twitter/callback');
          expect(authWindow.close).toHaveBeenCalled();
        });

        it('should close the authentication window when url fetched is the auth callback', function () {
          $rootScope.unauthenticated = true;
          callback('', '', 'http://somewhere/auth/twitter/callback');
          expect($rootScope.unauthenticated).toBeFalsy();
        });

        it('should not close the authentication window when url fetched is not the auth callback', function () {
          spyOn($rootScope, '$digest');
          callback('', '', 'somethingelse');
          expect(authWindow.close).not.toHaveBeenCalled();
        });

        it('should get cookies and register a callback for when they are retrieved', function () {
          callback('', '', '');
          expect(authWindow.webContents.session.cookies.get).toHaveBeenCalledWith({}, jasmine.any(Function));
        });

        describe('get cookies callback', function () {
          var cookiesCallback;
          beforeEach(function () {
            callback('', '', '');
            cookiesCallback = authWindow.webContents.session.cookies.get.calls.argsFor(0)[1];
          });

          it('should do nothing if no cookie matches blipsession', function () {
            spyOn($cookies, 'put');
            cookiesCallback('error', [{name: 'wrongcookie'}]);
            expect($cookies.put).not.toHaveBeenCalled();
          });

          it('should put the blipsession cookie if it exists', function () {
            spyOn($cookies, 'put');
            cookiesCallback('error', [{name: 'blipsession', value: 'val'}]);
            expect($cookies.put).toHaveBeenCalledWith('blipsession', 'val');
          });
        });
      });
    });
  });
});
