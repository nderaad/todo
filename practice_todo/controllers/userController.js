var User = require('../models/userModel');

var bodyParser = require('body-parser');

module.exports = function(app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

//--Create new user
  app.post('/register', function(req, res) {
    var newUser = User( {
      firstname: req.body.fname,
      lastname: req.body.lName,
      username: req.body.uName,
      password: req.body.pword
    });

    newUser.save(function(err){
      if (err) throw err;
      return res.send('Registered;');
    });
  });
}
