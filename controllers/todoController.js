var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/todo";


//var data = [{item: 'get milk', dead: '2'}, {item: 'get water', dead: '3'}, {item: 'make website', dead: '1'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
	app.get('/todo', function(req, res){
		// get data from mongodb
		mongo.connect(url, function(err, db){
			if(err) throw err;
			var dbo = db.db("todo");
			dbo.collection("mylist").find({}).toArray(function(err, result){
				if(err) throw err;
				res.render('list', {todos: result});
				db.close();
			});
		});
		
	});

	app.post('/todo', urlencodedParser, function(req, res){
		// add data to mongodb
		mongo.connect(url, function(err, db){
			if(err) throw err;
			var dbo = db.db("todo");
			var myobj = req.body;
			dbo.collection("mylist").insertOne(myobj, function(err, data){
				if(err) throw err;
				dbo.collection("mylist").find({}).toArray(function(err, result){
					if(err) throw err;
					res.json(result);
					db.close();
				}); 
			});
		});
	});

	app.delete('/todo', urlencodedParser, function(req, res){
		// delete requested item from mongodb
		mongo.connect(url, function(err, db){
			if(err) throw err;
			var dbo = db.db("todo");
			var myquery = req.body;
			dbo.collection("mylist").deleteOne(myquery, function(err, obj){
				if(err) throw err;
				dbo.collection("mylist").find({}).toArray(function(err, result){
					if(err) throw err;
					res.json(result);
					db.close();
				}); 
			});
			
		});
	});
};