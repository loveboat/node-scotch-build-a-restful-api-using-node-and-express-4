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

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// default API route
router.get('/', function(req, res) {
  res.send('hooray! welcome to our api!');
});

// more routes will happen here

// on routes that end in /bears
router.route('/bears')

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {

    var bear = new Bear();
    bear.name = req.body.name;

    bear.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Bear created'});
    });
  })

  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);

      res.json(bears);
    });
  });

// on routes that end in /bears/:bear_id
router.route('/bears/:bear_id')

  // get the bear with that id (accessed at GET http:localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });
  })

  // update the bear with this id (accessed at PUT http:localhost:8080/api/bears/:bear_id)
  .put(function(req, res) {

    // use our Bear model to find the bear we want
    Bear.findById(req.params.bear_id, function(err, bear) {

      if (err)
        res.send(err);

      bear.name = req.body.name; // update the bears info

      // save the bear
      bear.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Bear updated!' });
      });
    });
  })

  // delete the bear with this id (accessed at DELETE http:localhost:8080/api/bears/:bear_id)
  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


// REGISTER OUR ROUTES
// all our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
