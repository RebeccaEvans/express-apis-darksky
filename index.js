// Require node modules that you need
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');
var geocoder = require('simple-geocoder');

// Declare your app
var app = express();

// Tell express what view engine you want to use
app.set('view engine', 'ejs');

// Include any middleware here
app.use(layouts);
app.use(express.static('static'));
app.use(parser.urlencoded({ extended: false }));


// Declare routes
app.get('/', function(req, res){
  res.render('home');
});


app.post('/', function(req, res){
  let location = req.body.address

  geocoder.geocode(location, function(success, locations) {
    if(success) {
      var longitude = locations.x
      var latitude = locations.y
      console.log("Location: ", longitude, latitude);
    }

  });
  res.render('result');
});

// Listen on PORT 3000
app.listen(3000, function(){
  console.log('I\'m listening to the smooth sounds of port 3000 in the morning. ☕');
});
