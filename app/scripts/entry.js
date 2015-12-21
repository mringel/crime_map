require('./leaflet');
require('angular/angular');
require('angular-route');
var angular = window.angular;
require('./directives/angular-leaflet-directive');
require('./Leaflet.MakiMarkers.js');
require('./multi-select');
require('angular-material');




var crimeMapApp = angular.module('CrimeMapApp', ['leaflet-directive', 'ngRoute', 'isteven-multi-select', require('angular-aria'), require('angular-material') ]);
// require('./services/services')(crimeMapApp);
// require('./directives/directives')(crimeMapApp);
require('./map/map')(crimeMapApp);

crimeMapApp.config(['$routeProvider',function($route){
  $route
    .when('/map', {
      controller: 'MapController'
    })
     .when('/about', {
      templateUrl: '../templates/about.html',
      controller: 'MapController'
    })
     .when('/howto', {
      templateUrl: '../templates/howto.html',
      controller: 'MapController'
    })
    .otherwise({
      redirectTo: '/map'
    });
}]);
