require('./leaflet');
require('angular/angular');
var angular = window.angular;
require('./directives/angular-leaflet-directive');
require('./multi-select');
require('angularjs-datepicker');


var crimeMapApp = angular.module('CrimeMapApp', ['leaflet-directive', 'isteven-multi-select', '720kb.datepicker']);
// require('./services/services')(crimeMapApp);
// require('./directives/directives')(crimeMapApp);
require('./map/map')(crimeMapApp);
