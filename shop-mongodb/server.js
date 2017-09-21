// Initialisierung des Webservers
const express = require('express');
const app = express();

// body-parser initialisieren
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// EJS Template Engine initialisieren
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');


// initialize Mongo-DB
// Achtung: dies funktioniert NICHT im HAW-Netz!
const MONGO_URL = "mongodb://shop_user:secret@ds141274.mlab.com:41274/shop2";
const DB_COLLECTION = "articles";
const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect(MONGO_URL, (err, database) => {
	if (err) return console.log(err)
		db = database
		app.listen(3000, () => {
			console.log('listening on 3000')
		});
});




app.get('/create', function(req, res){
	res.render('create');
});
app.post('/hinzufuegen', function(req,res){
	const artikel = req.body['artikel'];
	const preis = req.body['preis'];
	console.log(`Artikel ${artikel}: ${preis}`);
	
	// Datensatz definieren
	const document = {'artikel': artikel, 'preis': preis};
	
	db.collection(DB_COLLECTION).save(document, function(err, result){
		console.log('Datensatz gespeichert');
		res.redirect('/');
	});
	
	
});


app.get('/', (req, res) => {
	/* zum Testen: Beispiel-Liste an index.ejs schicken
	const liste = [
		{artikel: "USB-STick", preis: 8.99},
		{artikel: "Festplatte", preis: 89.97}
	];
	res.render('index', {'artikelliste': liste});
	*/

	// Liste aller Artikel aus der Datenbank holen -> tariable result
	db.collection(DB_COLLECTION).find().toArray(function(err, result) {
		// die Variable result enthält die Liste aller Artikel in der Datenbank
		// diese wird an index.ejs gesendet
		res.render('index', {'artikelliste': result});
	});
});
