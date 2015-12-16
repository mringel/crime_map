require('./leaflet');
require('angular/angular');
var angular = window.angular;
require('./directives/angular-leaflet-directive');

var crimeMapApp = angular.module('CrimeMapApp', ['leaflet-directive']);
// require('./services/services')(crimeMapApp);
// require('./directives/directives')(crimeMapApp);

crimeMapApp.controller("SimpleMapController", [ '$scope', function($scope) {
  var tilesDict = {
    openstreetmap: {
              url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              options: {
                  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }
          },
    opencyclemap: {
              url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
              options: {
                  attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
              }
          },
    mapbox_dark: {
              name: 'Mapbox Dark',
              url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
              type: 'xyz',
              options: {
                  apikey: process.env.MAPBOX_PUBLIC_TOKEN,
                  mapid: 'mapboox.dark'
              }
          },
    mapbox_wheat: {
              name: 'Mapbox Wheat Paste',
              url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
              type: 'xyz',
              options: {
                  apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                  mapid: 'bufanuvols.lia35jfp'
              }
          }
      };


    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        },
        tiles: tilesDict.mapbox_dark
    });

}]);
