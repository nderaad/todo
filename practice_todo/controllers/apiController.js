var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

//-- Create new todo
  app.post('/submit', function(req, res){
    var newTodo = Todos({
      username: req.body.username,
      todo: req.body.todo,
      isDone: false,
      hasAttachment: req.body.hasAttachment
    });
    newTodo.save(function(err) {
      if(err) throw err;

      res.render('mylist');
    });
  });

//--  get list of all todos (FOR TESTING)
  app.get('/api/todo', function(req, res) {
    Todos.find({isDone: false},
    function(err,todos) {
      if(err) throw err;

      res.send(todos);
    });
  });
//--  get todo by username
  app.get('/mylist/:uname', function(req, res) {
    Todos.find({username: req.params.uname},
    function(err,todos) {
      if(err) throw err;

      res.send(todos);
    });
  });
//-- get todo by id
  app.get('/api/todo/:id', function(req, res) {

    Todos.findByID({_id: req.params.id}, function(err, todo) {
      if(err) throw err;

      res.send(todo);
    });
  });

//-- update todo by id
  app.post('/update/:uname', function(req, res){

    if(req.body.id){
      Todos.findByIdAndUpdate(req.body.id, {
        username: req.params.uname,
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment}, function(err, todo) {
          if(err) throw err;

          res.send('Success');
        });
      }
      else {

        var newTodo = Todos({
          username: 'test',
          todo: req.body.todo,
          isDone: req.body.isDone,
          hasAttachment: req.body.hasAttachment
        });
        newTodo.save(function(err) {
          if(err) throw err;

          res.send('Success');
        });
      }
    });

//-- Delete todo by ID
  app.delete('/delete', function(req, res) {

    Todos.findByIdAndRemove(req.body.id, function(err) {
      if(err) throw err;
      res.send('Success');
    });
  });
};
