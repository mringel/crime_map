module.exports = function(app) {
  app.directive('twitterDirective', ['$http', function($http) {
    return {
      restrict: 'ACE',
      transclude: false,
      // templateUrl: '/templates/twitter_directive.html',
      template: '<div>Ayy lmao</div',
      scope: {
        getTweets: function() {
          $http.get('/api/tweets/' + lat + ',' + long + ',1km&result_type=recent').success(function(data) {
            console.log(data);
          });
        }
      }

    };
  }]);
}
