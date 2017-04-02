var User = require('../models/userModel');

var bodyParser = require('body-parser');

module.exports = function(app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

//--Create new user
  app.post('/submit', function(req, res) {
    var newUser = User( {
      username: req.body.email,
      password: req.body.pw,
      name: req.body.name
    });

    newUser.save(function(err){
      if (err) throw err;
      return res.render('mylist');
    });
  });
}
