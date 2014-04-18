var 
  express = require('express'),
  bodyParser = require('body-parser');

var app = express();

// configure to use body parser so we can get the data from a post
app.use(bodyParser());