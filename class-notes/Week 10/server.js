// how do we know this is a npm project?
// A: It uses 'package.json' file

// what command do we run to start an npm project?
// A: 'npm init'

// how do we create the node_modules folder if it doesn't exist?
// A: 'npm install'

// what does the below chunk of code do?
/* A:	
		'express' : Focus on the web framework
		'multer' : file uploads
		'nunjucks' : template the engines
		'nedb' : database

		Simple Terms: Import the libraries/packages
*/
const express = require('express');
const multer = require('multer');
const nunjucks = require('nunjucks');
const nedb = require('@seald-io/nedb');

// what is app?
// A: An express application uses for web servers
const app = express();
// what is database?
// A: It's used to store data within a 'data.db' file when starting the server
const database = new nedb({ filename: 'data.db', autoload: true });

// what is this configuring?
// A: It creates the public folder using 'Multer'.
const upload = multer({
	dest: 'public/uploads',
});

// what do each of these statements do?
// write the answer next to the line of code
app.use(express.static('public')); // A: It allows express to expose those files within the 'public' folder
app.use(express.urlencoded({ extended: true })); /* A: 
Accept all types of input. 
Allow us to use request.body and read all the request data from the client
*/
app.set('view engine', 'njk'); // A: Sets view engines as njk file.
nunjucks.configure('views', {
	autoescape: true,
	express: app,
}); // A: Connects nunjucks files to express server and puts into views folder

// what type of request is this? what does it do?
// A: A 'Get' request. It gets the information from the homepage/'/', or whatever input route chosen
app.get('/', (request, response) => {
	// how many different responses can we write? list them.
	// A: response.send(), response.render(), response.redirect(), response.json(), response.sendFile()
	// how many parameters does response.render use? list them.
	// A: 2 Files: Name and Title
	/* write out the render for index.njk using the database: */
	database.find({}, (sendingToClient, foundData) => {
		response.render('index.njk', { sendingToClient: foundData });
	});
});

// what are the three parameters in this function?
// A: route '/upload', response 'req, res', and upload.single 
app.post('/upload', upload.single('theimage'), (req, res) => {
	let currentDate = new Date();

	// what type of data structure is this?
	// A: An object
	let data = {
		dataCaption: req.body.text,
		date: currentDate.toLocaleString(),
		timestamp: currentDate.getTime(),
	};

	// why do we write this if statement?
	// A: To check if a file exist.
	if (req.file) {
		data.image = '/uploads/' + req.file.filename;
	}

	// what does the insert function do?
	// A: It adds data into the database.
	database.insert(data);

	res.redirect('/');
});

// what does the number signify?
// A: 6001/Port Number
// how do we access this on the web?
// A: http://localhost:6001 / http://127.0.0.1:6001
app.listen(6001, () => {
	console.log('server started on port 6001');
});

// continue answering the questions in the index.njk
