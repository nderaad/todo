var express = require('express');
var app = express();
var mongoose = require('mongoose');
//--using bluebird promises installed instead of native ES6 for 4X speed
mongoose.Promise = require('bluebird');
//--establishing connection with config Folder that
//--has credentials and location of MongoDB
var config = require('./config');
var setupController = require('./controllers/setupController');
var htmlController = require('./controllers/htmlController');
var apiController = require('./controllers/apiController');
var userController = require('./controllers/userController');
//--establishes port as either an environment port for production
//--OR port 3000 when running locally
var port = process.env.PORT || 3000;

//--establish assets as url path for the public folder
app.use('assets', express.static(__dirname + '/public'));

//--establish ejs as the view engine
app.set('view engine', 'ejs');

//--establish connection with MondgoDB using config requirement above
mongoose.connect(config.getDbConnectionString());

htmlController(app);

apiController(app);

userController(app);

//--connect port
app.listen(port);
