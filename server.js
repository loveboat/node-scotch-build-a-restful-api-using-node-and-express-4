var 
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var app = express();

// configure to use body parser so we can get the data from a post
app.use(bodyParser());

// set our port
var port = process.env.PORT || 8080; 


// DB SETUP
// connect to a local database
mongoose.connect('mongodb://localhost:27017/build-a-restful-api-using-node-and-express-4');

var Bear = require('./app/models/bear');


// ROUTES FOR OUR API
var router = express.Router();

router.get('/', function(req, res) {
  res.send('hooray! welcome to our api!');
});

// more routes will happen here


// REGISTER OUR ROUTES
// all our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
