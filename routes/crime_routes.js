var express = require('express');
var handleError = require(__dirname + '/../lib/handleServerError');
var Crime = require(__dirname + '/../models/crime');
var requester = require('request');
var crimeRouter = module.exports = exports = express.Router();


crimeRouter.get('/externalCall/:month', function(req, res) {
  var result = callAPI(req.params.month, function(err, body){
    var incidents = JSON.parse(body).features;
    for(var i=0; i<incidents.length; i++){
      var newCrime = new Crime(incidents[i]);
      newCrime.save(function(err, data) {
        if (err) return console.log(err);
      });
    };
    res.json(body);
  });
});

function callAPI (search, cb){
    requester('https://data.seattle.gov/resource/y7pv-r3kh.geojson?month=' + search, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('socrata api called')
        };
        typeof cb === 'function' && cb(null, body);
    });
};
