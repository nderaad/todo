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
      res.send(newTodo.todo + ' was created successfully');
    });
  });

//--  get todo by username
  app.get('/api/todo/:uname', function(req, res) {
    Todos.find({username: req.params.uname},
    function(err,todos) {
      if(err) throw err;

      res.send(todos);
    });
  });

  app.get('/api/todo/:id', function(req, res) {

    Todos.findByID({_id: req.params.id}, function(err, todo) {
      if(err) throw err;

      res.send(todo);
    });
  });

  app.post('/api/todo/', function(req, res){

    if(req.body.id){
      Todos.findByIdAndUpdate(req.body.id, {
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

  app.delete('/api/todo/', function(req, res) {

    Todos.findByIdAndRemove(req.body.id, function(err) {
      if(err) throw err;
      res.send('Success');
    });
  });
};
