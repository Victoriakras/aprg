console.log("Node.js is working");

// Initialisierung des Webservers
const express = require('express');
const app = express();

// body-parser initialisieren
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// EJS Template Engine initialisieren
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// Webserver starten
// Aufruf im Browser: http://localhost:3000

app.listen(3000, function(){
	console.log("listening on 3000");
});

app.get('/', function(req, res) {
	res.send('Hello World');
});

app.get('/login', function(req,res){
	res.send('Login');
});

app.get('/app', function(req,res){
	res.send(`
	<html>
		<head>
			<title>Meine App</title>
		</head>
		<body>
			<h1>Ueberschrift</h1>
			Diese HTML-Seite wurde von Node erzeugt.
		</body>
	</html>
	`);
});

app.get('/formular', function(req, res){
	res.sendfile(__dirname + '/form.html');
});

app.post('/eingabe_auswerten', function(req, res){
	const input = req.body["vorname"];
	res.render('welcome', {'vorname': input});
	
});