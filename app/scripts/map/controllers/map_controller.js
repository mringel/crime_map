module.exports = function(app) {
  app.controller("MapController", [ '$scope', '$http', 'leafletData', function($scope, $http, leafletData) {


$scope.modernBrowsers = [
    {              name: "Opera",              maker: "(Opera Software)",        ticked: true  },
    {    name: "Internet Explorer",  maker: "(Microsoft)",             ticked: false },
    {         name: "Firefox",            maker: "(Mozilla Foundation)",    ticked: true  },
    {       name: "Safari",             maker: "(Apple)",                 ticked: false },
    {               name: "Chrome",             maker: "(Google)",                ticked: true  }
];



    //all crimes
    $scope.crimes = [];
    //types of crimes in db
    $scope.crimeTypes = [];
    //crime types selected from dropdown
    $scope.typeSelection = [];

        // Populates $scope.crimes with everything currently in the database
        $scope.getAll = function() {
          $http.get('/api/crimes')
          .then(function(res) {
            $scope.crimes = res.data;
          }, function(err) {
            console.log(err.data);
          });
        };

        //POPULATES DROPDOWN WITH INDEXED CRIME TYPES
        $scope.getTypes = function() {
          $http.get('/api/internal/crimetypes')
            .then(function(res) {
              for(var i=0; i<res.data.length; i++){
                $scope.crimeTypes.push({name: res.data[i]});
              }
            }, function(err) {
              console.log(err.data);
            });
        };
        $scope.getTypes();

        // Adds everything in $scope.crimes to the map
        $scope.addAll = function() {
          leafletData.getMap().then(function(map) {
            L.Icon.Default.imagePath = 'http://api.tiles.mapbox.com/mapbox.js/v1.0.0beta0.0/images';
            L.geoJson($scope.crimes, {
              onEachFeature: onEachFeature
            }).addTo(map);
          });
        };

        $scope.popupClicker= function() {
          console.log('This feature has been clicked: ');
        };

        // Called on each feature when plotted to attach popup
        function onEachFeature(feature, layer) {
          layer.bindPopup('offense type: ' + feature.properties.offense_type + '\n' +
            'occurred_date_or_date_range_start: ' + feature.properties.occurred_date_or_date_range_start +
          '<button class="pure-button" data-ng-click="popupClicker()">click me!</button>' );
        }

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
                  url: 'https://api.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                  type: 'xyz',
                  options: {
                    apikey: 'pk.eyJ1IjoibXJpbmdlbCIsImEiOiIwYjM4MzFkY2E3ZTEyNzAwNGM4M2VjODZlODlkNWZhNiJ9.EJlJwl9IJoBptQV_EARdYA',
                    mapid: 'mapbox.dark'
                  }
                },
                mapbox_light: {
                  name: 'Mapbox Light',
                  url: 'http://api.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                  type: 'xyz',
                  options: {
                    apikey: 'pk.eyJ1IjoibXJpbmdlbCIsImEiOiIwYjM4MzFkY2E3ZTEyNzAwNGM4M2VjODZlODlkNWZhNiJ9.EJlJwl9IJoBptQV_EARdYA',
                    mapid: 'mapbox.light'
                  }
                }
              };


              angular.extend($scope, {
                seattle: {
                  lat: 47.6,
                  lng: -122.33,
                  zoom: 12
                },
                defaults: {
                  scrollWheelZoom: false
                },
                tiles: tilesDict.openstreetmap
              });

              $scope.changeTiles = function(tiles) {
                $scope.tiles = tilesDict[tiles];
              };

            }]);
};
