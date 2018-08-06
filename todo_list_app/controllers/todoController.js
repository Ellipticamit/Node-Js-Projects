var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:todo123@ds159121.mlab.com:59121/tododb');

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var urlencodeParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo', function(req, res){
    // get the data from db and pass it to view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodeParser, function(req, res){
    // get data from here and save to the // DEBUG:
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req, res) {
    // delete item from db and delete it
      Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if (err) throw err;
        res.json(data)
      });
  });

};
