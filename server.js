var 
  express = require('express'),
  bodyParser = require('body-parser');

var app = express();

// configure to use body parser so we can get the data from a post
app.use(bodyParser());

var port = process.env.PORT || 8080; // set our port


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
