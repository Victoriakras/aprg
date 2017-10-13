//server init
const express = require('express');
const app = express();
//init bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
//init ejs
app.set('view engine', 'ejs');

//tingodb setup
const DB_COLLECTION = 'users';
const Db = require('tingodb')().Db;
const db = new Db(__dirname + '/tingodb', {});
const ObjectId = require('tingodb')().ObjectID;

//session setup
const session = require('express-session');
app.use(session({
    secret: 'this-is-a-secret',     //necessary for encoding
    resave: false,                  //should be set to false, except store needs it
    saveUninitialized: false        //same reason as above.
}));

//password hash, for encoding the pw
const passwordHash = require('password-hash');

//port
app.listen(3000, () => {
    console.log('Listening to Port 3000');
});

//either go to the landing page (user not logged in) or go to the content page (user logged in)
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

//go to login page
app.get('/login', (request, response) => {
    response.sendFile(__dirname + '/login.html');
});

//go to register page
app.get('/register', (request, response) => {
    response.sendFile(__dirname + '/register.html');
});

//create a new user in here (task 1)
//check if the user already exists before creating him (task 3)
//encrypt the password (task 4)
app.post('/users/register', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const repPassword = request.body.repPassword;

    let errors = [];
    if (username == "" || username == undefined) {
        errors.push('Bitte einen Username eingeben.');
    } 
    if (password == "" || password == undefined) {
        errors.push('Bitte ein Passwort eingeben.');
    } 
    if (repPassword == "" || repPassword == undefined) {
        errors.push('Bitte ein Passwort zur Bestätigung eingeben.');
    } 
    if (password != repPassword) {
        errors.push('Die Passwörter stimmen nicht überein.');
    }

    db.collection(DB_COLLECTION).findOne({'username': username}, (error, result) => {
        if (result != null) {
            errors.push('User existiert bereits.');
            response.render('errors', {'error': errors});
        } else {
            if (errors.length == 0) {
                const newUser = {
                    'username': username,
                    'password': password
                }
    
                db.collection(DB_COLLECTION).save(newUser, (error, result) => {
                    if (error) return console.log(error);
                    console.log('user added to database');
                    response.redirect('/');
                });
            } else {
                response.render('errors', {'error': errors});
            }
        } 
    });
});

//log the user into his account (task 2)
//make him login via sessions (task 5)
app.post('/users/login', (request, response) => {
   const username = request.body.username;
   const password = request.body.password;

   let errors = [];

   db.collection(DB_COLLECTION).findOne({'username': username}, (error, result) => {
        if (error) return console.log(error);

        if (result == null) {
            errors.push('Der User ' + username + 'existiert nicht.');
            response.render('errors', {'error': errors});
            return;
        } else {
            if (password == result.password) {
                response.redirect('/');
            } else {
                errors.push('Das Passwort für diesen User stimmt nicht überein.');
                response.render('errors', {'error': errors});
            }
        }
   });
});

//log the user out again and delete his session, redirect to main page
app.get('/logout', (request, response) => {

}); 