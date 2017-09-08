var express = require('express');
var mongoose = require('mongoose');
//require('dotenv').load();
var app = express();
var crimeRouter = require(__dirname + '/routes/crime_routes.js');

try {
  mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost/crime_db');
} catch(err) {
  console.log(err);
  console.log(process.env.MONGOLAB_URI);
}


app.use(express.static(__dirname + '/build'));

app.use('/api', crimeRouter);

app.listen(process.env.PORT || 3000, function(){
  console.log('server up');
});
