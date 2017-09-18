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


app.get('/eingabe', function(req, res){
	res.sendfile(__dirname + '/eingabe.html');
});

app.post('/summe_berechnen', function(req, res){
	// parseInt() wandelt einen String in eine Zahl um
	const zahl1 = parseInt(req.body["zahl1"]);
	const zahl2 = parseInt(req.body["zahl2"]);
	const summe = zahl1 + zahl2;
	res.render('ausgabe', {
		'first': zahl1, 
		'second': zahl2,
		'sum': summe
	});
});