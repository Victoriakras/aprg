// Initialisierung des Webservers
const express = require('express');
const app = express();

// body-parser initialisieren
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// EJS Template Engine initialisieren
app.set('view engine', 'ejs');

//Initialisierung von tingodb
// Name der Collection festlegen
const DB_COLLECTION = "products"; 
// Leeren Ordner ./tingodb anlegen
require('fs').mkdir(__dirname + '/tingodb', (err)=>{});
// Datenbank initialisieren
const Db = require('tingodb')().Db;
const db = new Db(__dirname + '/tingodb', {});
const ObjectID = require('tingodb')().ObjectID;

// Webserver starten
// Aufruf im Browser: http://localhost:3000

app.listen(3000, function(){
	console.log("listening on 3000");
});

app.get('/addArticle', (request, response) => {
    response.sendFile(__dirname + '/shop.html');
});

app.post('/addToCart', (request, response) => {
    const name = request.body.name;
    const price = request.body.price;

    const article = {'name': name, 'price': price};
    db.collection(DB_COLLECTION).save(article, (err, result) => {
        if (err) return console.log(err);
        response.redirect('/');
    });
});

app.post('/delete/:id', (request, response) => {
    const id = request.params.id;
    const o_id = new ObjectID(id);

    db.collection(DB_COLLECTION).remove({'_id': o_id}, (error, result) => {
        response.redirect('/');
    });
});

//Produkte auf der Startseite anzeigen lassen
app.get('/', (request, response) => {
    db.collection(DB_COLLECTION).find().toArray(function (err, result) {
        if (err) return console.log(err);
        response.render('index', { 'products': result});
    });   
});