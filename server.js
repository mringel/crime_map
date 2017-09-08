var express = require('express');
var mongoose = require('mongoose');
//require('dotenv').load();
var app = express();
var crimeRouter = require(__dirname + '/routes/crime_routes.js');

console.log("--------Mongolab URI----------")
console.log(process.env.MOGODB_URI);

try {
  mongoose.connect('mongodb://heroku_wsk73r7d:34dprp98se1772gj3s29nt9ckk@ds129394.mlab.com:29394/heroku_wsk73r7d');
} catch(err) {
  console.log(err);
  console.log(process.env.MONGOLAB_URI);
}


app.use(express.static(__dirname + '/build'));

app.use('/api', crimeRouter);

app.listen(process.env.PORT || 3000, function(){
  console.log('server up');
});
