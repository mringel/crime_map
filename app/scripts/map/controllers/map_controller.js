module.exports = function(app) {
  app.controller("MapController", [ '$scope', '$http', 'leafletData', '$compile', function($scope, $http, leafletData, $compile) {

    //all crimes (deprecated)
    $scope.crimes = [];
    //types of crimes in db
    $scope.crimeTypes = [];
    //crime types selected from dropdown
    $scope.selectedTypes = [];

    // layers that are currently on the map (deprecated by $scope.layerGroup)
    $scope.mapLayers = [];

    $scope.startDate;
    $scope.endDate = new Date();
    $scope.tweets = [];

        //GETS ALL CRIMES IN DB
    // initialize a leaflet layergroup and add it to the map for better layer control
    $scope.layerGroup = null;
    leafletData.getMap().then(function(map) {
      $scope.layerGroup = L.layerGroup().addTo(map);
    });


        //GETS ALL CRIMES IN DB (deprecated, not used in current master)
        $scope.getAll = function() {
          $http.get('/api/crimes')
          .then(function(res) {
            $scope.crimes = res.data;
          }, function(err) {
            console.log(err.data);
          });
        };

        //ADDS ALL CRIMES IN DB TO MAP (deprecated)
        $scope.addAll = function() {
          leafletData.getMap().then(function(map) {
            L.Icon.Default.imagePath = './images/leaflet';
            L.geoJson($scope.crimes, {
              onEachFeature: onEachFeature
            }).addTo(map);
          });
        };

        //USES SELECTED VALUES FROM DROPDOWN TO FETCH MATCHING CRIMES AND MAP
        $scope.mapSelected = function(){

  var LeafIcon = L.Icon.extend({
      options: {
        shadowUrl: 'images/leaflet/DUI.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
      }
    });
          $scope.clearMap();
          angular.forEach($scope.selectedTypes, function( value, key ) {
            for(var x=0; x<$scope.selectedTypes.length; x++){
              $http.get('/api/internal/crimetypes/'
                + $scope.selectedTypes[x].name
                + '/'
                + $scope.startDate
                + '/'
                + $scope.endDate)
              .then(function(res){
                leafletData.getMap().then(function(map) {
                  L.Icon.Default.imagePath = './images/leaflet';
                  $scope.mapLayers.push(L.geoJson(res.data, {
                  onEachFeature: onEachFeature,
                }).addTo(map));
                  var newLayer = L.geoJson(res.data, {
                    onEachFeature: onEachFeature
                  });
                  $scope.layerGroup.addLayer(newLayer);
                  map.fitBounds(newLayer);

                });
              });
            }
          });
        };

        // removes layers that have been plotted on the map
        $scope.clearMap = function() {
          $scope.layerGroup.clearLayers();
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

        // get's code inserted into DOM by leaflet popup compiled into angular
        $scope.$on('leafletDirectiveMap.popupopen', function(event, args) {
          var feature = args.leafletEvent.popup.options.feature;
          var newScope = $scope.$new();
          newScope.stream = feature;
          $compile(args.leafletEvent.popup._contentNode)(newScope);
        });

        // function that is called when button in popup is clicked
        $scope.popupClicker= function(lat, long, time) {
          // console.log('The lat/long of this feature is: ', lat, long +
          //   '\nCrime occured or began at: ', time);
          $scope.getTweets(lat, long, time);
          console.log(time);
        };

        $scope.getTweets = function(lat, long, date) {
          $http.get('/api/tweets/' + lat + ',' + long + '/1')
          .then(function(res) {
            $scope.tweets = res.data;
          }, function(err) {
            console.log(err);
          });
        };

        // Called on each feature when plotted to attach popup
        function onEachFeature(feature, layer) {
          var time = feature.properties.occurred_date_or_date_range_start.split('-');
          yearMonthDay = time.slice(0,2).join('');
          yearMonthDay += (time[2].split('T')[0]);

          // layer.bindPopup('offense type: ' + feature.properties.offense_type + '\n' +
          //   'occurred_date_or_date_range_start: ' + feature.properties.occurred_date_or_date_range_start +
          //   '<button class="pure-button" data-ng-click="popupClicker('+feature.properties.latitude+','+feature.properties.longitude+', '+yearMonthDay+')">Nearby Tweets</button>' );

          layer.bindPopup('<div><p> <b>offense type:</b> '
            + feature.properties.offense_type + '<br>' + '<b>occurred on:</b> '
            + feature.properties.occurred_date_or_date_range_start + '<br></p>'
            + '<button class="pure-button" data-ng-click="popupClicker('
            + feature.properties.latitude + ',' + feature.properties.longitude
            + ', ' + yearMonthDay + ')">Nearby Tweets</button></div>' );

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
              mapid: 'mapbox.dark',
              attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
          },
          mapbox_light: {
            name: 'Mapbox Light',
            url: 'http://api.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            type: 'xyz',
            options: {
              apikey: 'pk.eyJ1IjoibXJpbmdlbCIsImEiOiIwYjM4MzFkY2E3ZTEyNzAwNGM4M2VjODZlODlkNWZhNiJ9.EJlJwl9IJoBptQV_EARdYA',
              mapid: 'mapbox.light',
              attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
          }
        };

    //BEGIN DATE RENDERING
    $scope.startDate = new Date();
    $scope.endDate = new Date();

    $scope.minDate = new Date(
        $scope.startDate.getFullYear(),
        $scope.startDate.getMonth(),
        $scope.startDate.getDate()+1);

    $scope.maxDate = new Date();

    function daysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
    }

    $scope.renderEnd = function(){
      $scope.minDate = new Date(
        $scope.startDate.getFullYear(),
        $scope.startDate.getMonth(),
        $scope.startDate.getDate()+1
      );
      $scope.maxDate = new Date(
        $scope.startDate.getFullYear(),
        $scope.startDate.getMonth(),
        $scope.startDate.getDate() + (daysInMonth($scope.startDate.getMonth()+1, $scope.startDate.getYear()) - $scope.startDate.getDate())
      );
    }
    //END DATE RENDERING

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
