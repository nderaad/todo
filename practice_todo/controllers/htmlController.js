var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//----------------------------------------------------------------------------
module.exports = function(app){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));


  app.get('/', function(req, res) {
    res.render('index')
  });

  // app.post('/submit', function(req, res) {
  //   var blah = req.body.todo;
  // });

}
