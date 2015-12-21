require('./leaflet');
require('angular/angular');
var angular = window.angular;
require('./directives/angular-leaflet-directive');
require('./Leaflet.MakiMarkers.js');
require('./multi-select');
require('angular-material');




var crimeMapApp = angular.module('CrimeMapApp', ['leaflet-directive', 'isteven-multi-select', require('angular-aria'), require('angular-material') ]);
// require('./services/services')(crimeMapApp);
// require('./directives/directives')(crimeMapApp);
require('./map/map')(crimeMapApp);

