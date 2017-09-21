// Initialisierung des Webservers
const express = require('express');
const app = express();

// body-parser initialisieren
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// EJS Template Engine initialisieren
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

/* wird später verwendet ...
// Sessions initialisieren
const session = require('express-session');
app.use(session({ 
	secret: 'example',
	resave: false,
	saveUninitialized: true
}));
*/

/* wird später verwendet ...
// Initialisierung TingoDB - eine lokale Datenbank
// Vorbereitung: leeren Ordner 'tingodb' im Projektordner anlegen

// Name der Collection
const DB_COLLECTION = "products"; <-- BITTE ANPASSEN!

// Initialisierung der Datenbank
require('fs').mkdir(__dirname + '/tingodb', (err)=>{});
const Db = require('tingodb')().Db;
const db = new Db(__dirname + '/tingodb', {});
const ObjectID = require('tingodb')().ObjectID;
*/


// Webserver starten
// Aufruf im Browser: http://localhost:3000

app.listen(3000, function(){
	console.log("listening on 3000");
});

