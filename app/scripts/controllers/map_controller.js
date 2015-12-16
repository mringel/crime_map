module.exports = function(app) {
  app.controller("SimpleMapController", [ '$scope', function($scope) {
    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        }
    });

  }]);
};
