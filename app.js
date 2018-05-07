var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

// set up template engine

app.set('view engine', 'ejs');

//static files

app.use(express.static('./views')); 

// fire controllers

todoController(app);

app.listen(8000);