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
// initialize Mongo-DB
const MONGO_URL = "mongodb://shop_user:secret@ds127894.mlab.com:27894/shop";
const DB_COLLECTION = "users";
const MongoClient = require('mongodb').MongoClient
let db;

MongoClient.connect(MONGO_URL, (err, database) => {
	if (err) return console.log(err)
		db = database
		app.listen(PORT, () => {
			console.log('listening on 3000')
		})
});
*/


// Webserver starten
// Aufruf im Browser: http://localhost:3000

app.listen(3000, function(){
	console.log("listening on 3000");
});

