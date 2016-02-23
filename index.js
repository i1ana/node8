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

// Routes \\

app.get('/', function(req, res) {
	res.sendFile('index.html', {root : './public'});
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.sendFile('applicants.html', {root : './public'});
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	res.send('Success!')
	console.log(req.body)

		var yob = new JobApp({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why
	})

	yob.save()

	res.redirect('/html/success.html')
});


//Sending data for applicants 
app.get('/api/applicants', function(req, res){
	JobApp.find({}, function(err, results){
		console.log(err)
		console.log(results)
		res.send(results)
	})
})


// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})