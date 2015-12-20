require('./leaflet');
require('angular/angular');
var angular = window.angular;
require('./directives/angular-leaflet-directive');
require('./multi-select');
require('angular-material');
require('angular-route');




var crimeMapApp = angular.module('CrimeMapApp', ['ngRoute', 'leaflet-directive', 'isteven-multi-select', require('angular-aria'), require('angular-material') ]);
// require('./services/services')(crimeMapApp);
require('./controllers/controllers')(crimeMapApp);
// require('./directives/directives')(crimeMapApp);
require('./map/map')(crimeMapApp);

crimeMapApp.config(['$routeProvider', function($route) {
  $route
    .when('/crime', {
      templateUrl: '/templates/crime_view.html',
      controller: 'MapController'
    })
    .when('/howto', {
      templateUrl: '/templates/howto_view_template.html',
      controller: 'HowToController'
    })
    .when('/about', {
      templateUrl: '/templates/about_view_template.html',
      controller: 'AboutController'
    })

    .otherwise({
      redirectTo: '/crime'
    });
}]);
