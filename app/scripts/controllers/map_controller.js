module.exports = function(app) {
  app.controller("SimpleMapController", [ '$scope', '$http', function($scope, $http) {

    $scope.choices = [];

    $scope.getTypes = function() {
      $http.get('/api/internal/crimetypes')
        .then(function(res) {
          alert(res.data);
          $scope.choices = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.getTypes();

    angular.extend($scope, {
        seattleCenter: {
            lat: 47.608013,
            lng: -122.335167,
            zoom: 12
        },
        markers: {
            osloMarker: {
                lat: 47.625347,
                lng: -122.338842,
                message: "I want to travel here!",
                focus: true,
                draggable: false
            }
        },
        defaults: {
            scrollWheelZoom: false
        }
    });

  }]);
};
