var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//----------------------------------------------------------------------------
module.exports = function(app){

  app.get('/', function(req, res) {
    res.render('index')
  });

  app.post('/submit', function(req, res) {
    res.send('Success')
  });

}
