var express = require('express');
var bodyParser = require('body-parser');
var handleError = require(__dirname + '/../lib/handleServerError');
var Crime = require(__dirname + '/../models/crime');
var requester = require('request');

var crimeRouter = module.exports = exports = express.Router();


crimeRouter.get('/externalCall',  function(req, res) {
  var result = callAPI(req.params.search, function(err, body){
    console.log(body);
    res.json(body);
  });
});

function callAPI (search, cb){
    requester('https://data.seattle.gov/resource/y7pv-r3kh.geojson', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //console.log(body)
        };
        typeof cb === 'function' && cb(null, body);
    });
};
