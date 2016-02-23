// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose')

// Create Express App Object \\
var app = express();
mongoose.connect('mongodb://localhost/jobapp')

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


var jobAppSchema = mongoose.Schema({
	name	: {type: String},
	bio 	: String,
	skills	: {type: Array},
	years	: {type: Number},
	why		: String,
})

//MODEL COLLECTION 
var JobApp = mongoose.model('JobApp', jobAppSchema)

var yob = new JobApp({
	name	: req.body.name,
	bio: 'an adventuror',
	skills: ['walking', 'carrying rings', 'being small'],
	years: 13,
	why: 'looking for a new mission'
})

yob.save(function(err, document){
	console.log('Error: ', err)
	console.log('Docu: ', document)
	res.send(document)
})

// Routes \\

app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'});
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.sendFile('html/applicants.html', {root : './public'});
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	res.send('Success!')
	console.log(req.body)
});

app.get('/success', function(req, res){
	res.redirect('/success')

})


// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})