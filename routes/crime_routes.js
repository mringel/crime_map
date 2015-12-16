var express = require('express');
var handleError = require(__dirname + '/../lib/handleServerError');
var Crime = require(__dirname + '/../models/crime');
var requester = require('request');
var Twitter = require('twitter');
var crimeRouter = module.exports = exports = express.Router();

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});


crimeRouter.get('/externalSPD/:month', function(req, res) {
  var result = callSPD(req.params.month, function(err, body){
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

crimeRouter.get('/crimes', function(req, res) {
  Crime.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

crimeRouter.get('/externalTWITTER/:month', function(req, res) {
  var result = callTwitter();
  res.json('');
});

crimeRouter.get('/internal/crimetypes', function(req, res) {
  Crime.find().distinct('properties.summarized_offense_description', function(err, types) {
      if (err) return handleError(err, types);
      res.json(types);
  });
})

function callSPD (search, cb){
    requester('https://data.seattle.gov/resource/y7pv-r3kh.geojson?month=' + search, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('socrata api called')
        };
        typeof cb === 'function' && cb(null, body);
    });
};

var params = {screen_name: 'nodejs'};

function callTwitter (){
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if(error){
      console.log(error);
    }
    if (!error) {
      console.log(tweets);
    }
});
}
