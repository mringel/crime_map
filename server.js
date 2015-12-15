var express = require('express');
var mongoose = require('mongoose');
require('dotenv').load();
var app = express();
var crimeRouter = require(__dirname + '/routes/crime_routes.js');

//twitter api
var consumer_key = process.env.TWITTER_CONSUMER_KEY;
var consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
var access_token_key = process.env.TWITTER_TOKEN_KEY;
var access_token_secret = process.env.TWITTER_TOKEN_SECRET;


mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost/crime_db');

app.use(express.static(__dirname + '/build'));

app.use('/api', crimeRouter);

app.listen(process.env.PORT || 3000, function(){
  console.log('server up');
});
