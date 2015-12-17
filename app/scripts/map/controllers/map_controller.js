module.exports = function(app) {
  app.controller("MapController", [ '$scope', '$http', 'leafletData', '$compile', function($scope, $http, leafletData, $compile) {

    //all crimes
    $scope.crimes = [];
    //types of crimes in db
    $scope.crimeTypes = [];
    //crime types selected from dropdown
    $scope.selectedTypes = [];
    $scope.startDate = new Date('January 1, 1970 00:00:00');;
    $scope.endDate = new Date();


        //GETS ALL CRIMES IN DB
        $scope.getAll = function() {
          $http.get('/api/crimes')
          .then(function(res) {
            $scope.crimes = res.data;
          }, function(err) {
            console.log(err.data);
          });
        };

        //ADDS ALL CRIMES IN DB TO MAP
        $scope.addAll = function() {
          leafletData.getMap().then(function(map) {
            L.Icon.Default.imagePath = 'http://api.tiles.mapbox.com/mapbox.js/v1.0.0beta0.0/images';
            L.geoJson($scope.crimes, {
              onEachFeature: onEachFeature
            }).addTo(map);
          });
        };

        //USES SELECTED VALUES FROM DROPDOWN TO FETCH MATCHING CRIMES AND MAP
        $scope.mapSelected = function(){
          angular.forEach( $scope.selectedTypes, function( value, key ) {
            for(var x=0; x<$scope.selectedTypes.length; x++){
              $http.get('/api/internal/crimetypes/'
                + $scope.selectedTypes[x].name
                + '/'
                + $scope.startDate
                + '/'
                + $scope.endDate)
              .then(function(res){
                leafletData.getMap().then(function(map) {
                  L.Icon.Default.imagePath = 'http://api.tiles.mapbox.com/mapbox.js/v1.0.0beta0.0/images';
                  L.geoJson(res.data, {
                  onEachFeature: onEachFeature
                  }).addTo(map);
                });
              });
            }
          });
          $scope.selectedTypes.length=0;
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


        $scope.$on('leafletDirectiveMap.popupopen', function(event, args) {
          var feature = args.leafletEvent.popup.options.feature;
          var newScope = $scope.$new();
          newScope.stream = feature;
          $compile(args.leafletEvent.popup._contentNode)(newScope);
        });

        $scope.popupClicker= function(lat, long, time) {
          console.log('The lat/long of this feature is: ', lat, long +
            '\nCrime occured or began at: ', time);
        };

        // Called on each feature when plotted to attach popup

        function onEachFeature(feature, layer) {
          var time = feature.properties.occurred_date_or_date_range_start.split('-');
          yearMonthDay = time.slice(0,2).join('');
          yearMonthDay += (time[2].split('T')[0]);
          layer.bindPopup('offense type: ' + feature.properties.offense_type + '\n' +
            'occurred_date_or_date_range_start: ' + feature.properties.occurred_date_or_date_range_start +
            '<button class="pure-button" data-ng-click="popupClicker('+feature.properties.latitude+','+feature.properties.longitude+', '+yearMonthDay+')">click me!</button>' );
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
