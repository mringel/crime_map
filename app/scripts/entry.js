require('./leaflet');
require('angular/angular');
var angular = window.angular;
require('./directives/angular-leaflet-directive');

var crimeMapApp = angular.module('CrimeMapApp', ['leaflet-directive']);
// require('./services/services')(crimeMapApp);
// require('./directives/directives')(crimeMapApp);

crimeMapApp.controller("SimpleMapController", [ '$scope', function($scope) {
    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        }
    });
}]);
