require(__dirname + '/../../app/scripts/entry');
require('angular-mocks');

describe('map controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('CrimeMapApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('MapController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.tweets)).toBe(true);
  });

  describe('REST functionality', function() {

    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('MapController', {$scope: $scope});
      $httpBackend.expectGET('/api/internal/crimetypes').respond(200, '');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      // make sure AJAX calls happened and were dealt with
    });

    it('should add array to $scope.crimes when getAll() is called', function() {
      $httpBackend.expectGET('/api/crimes').respond(200, [{crime: 'horrible crime'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.crimes[0].crime).toBe('horrible crime');
    });

    it('should add array to $scope.tweets when getTweets() is called', function() {
      $httpBackend.expectGET('/api/tweets/lat,long/startdate/enddate').respond(200, [{tweet: 'relevant tweet'}]);
      $scope.getTweets('lat', 'long', 'startdate', 'enddate');
      $httpBackend.flush();
      expect($scope.tweets[0].tweet).toBe('relevant tweet');
    });

    it('should push crime types from /api/internal/crimetypes to $scope.crimeTypes with getTypes()', function() {
      $httpBackend.expectGET('/api/internal/crimetypes').respond(200, ['burglary', 'robbery', 'shoplifting']);
      $scope.getTypes();
      $httpBackend.flush();
      expect($scope.crimeTypes).toEqual([{name: 'burglary'}, {name: 'robbery'}, {name: 'shoplifting'}]);
    });



  });

});
