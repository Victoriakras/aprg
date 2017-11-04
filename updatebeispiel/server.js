//Express, bodyparser setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//set view engine, enable urlencoding
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
//setup tingoDB
const DB_COLLECTION = "users";
const Db = require('tingodb')().Db;
const db = new Db(__dirname + '/tingodb', {});
const ObjectID = require('tingodb')().ObjectID;
//Sessions setup
const session = require('express-session');
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
}));
//Server start
const port = 3000;
app.listen(port, () => {
    console.log('Listening on ' + port);
})
//Servercalls in order to get the pages
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.get('/login',(request, response) => {
    const username = request.body.username;

    response.render('login', {
        'username': username,
        'errors': []
    });
});

app.get('/register',(request, response) => {
    const username = request.body.username;
    const email = request.body.email;

    response.render('register', {
        'username': username,
        'email': email,
        'errors': []
    });
});

app.get('/content',(request, response) => {
    if(request.session.authenticated) 
    {
        console.log(request.session.userID);
        db.collection(DB_COLLECTION).findOne({'_id': request.session.userID}, (error, result) => {
            if(error) return console.log(error);

            response.render('content', {
                'username': result.username,
                'password': result.password,
                'email': result.email,
                'authenticated': request.session.authenticated
            });
        });
        return;
    }
    response.render('content', {
        'username': "",
        'password': "",
        'email': "",
        'authenticated': request.session.authenticated
    });
});

//login handler
app.post('/user/login', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    db.collection(DB_COLLECTION).findOne({'username': username}, (error, result) => {
        if(error) return console.log(error);

        let err = [];

        if(result == null) 
        {
            err.push('Username and/or password incorrect');
            response.render('login', {
                'username': username,
                'errors': err
            });
            return;
        }

        if(!result.password == password)
        {
            err.push('Username and/or password incorrect');
        }

        if(err.length != 0)
        {
            //render error page
            response.render('login', {
                'username': username,
                'errors': err
            });
        }

        request.session.authenticated = true;
        request.session.userID = result._id;
        //Render Content-page with authentication set.
        response.redirect('/content');
    });
});

//registration handler
app.post('/user/register', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const repPassword = request.body.repPassword;
    const email = request.body.email;

    let registrationError = [];

    if(password == "" || repPassword == "" || email == "" || username == "")
        registrationError.push('Please fill in all the data!');
    if(password != repPassword) 
        registrationError.push("The passwords don't match!");
    
    db.collection(DB_COLLECTION).findOne({'username': username}, (error, result) => {
        if(error) console.log(error);

        if(result != null)
        {
            registrationError.push('Username is already in Use');
        }

        if(registrationError != 0)
        {
            response.render('register', {
                'username': username,
                'email': email,
                'errors': registrationError
            });
            return;
        }
    
        const user = {
            'username': username,
            'password': password,
            'email': email
        };
    
        db.collection(DB_COLLECTION).save(user, (error, result) => {
            if(error) console.log(error);
    
            console.log('New user created!');
            response.render('login', {
                'username': username,
                'errors': []
            });
        });
    });
});

//update handler
app.get('/update', (request, response) => {

    db.collection(DB_COLLECTION).findOne({'_id': request.session.userID}, (error, result) => {
        if(error) return console.log(error);

        response.render('update', {
            'username': result.username,
            'password': result.password,
            'email': result.email,
            'errors': []
        });
    });
});

app.post('/user/update', (request, response) => {
    const newName = request.body.username;
    const newPW = request.body.password;
    const repeatNewPW = request.body.password;
    const newMail = request.body.email;

    let updateErrors = [];

    if(newName == "" || newPW == "" || repeatNewPW == "" || newMail == "")
        updateErrors.push('Please fill in all the Data!');
    if(newPW != repeatNewPW)
        updateErrors.push('Passwords dont match');
    
    if(updateErrors.length > 0)
    {
        response.render('update', {
            'username': newName,
            'password': newPW,
            'email': newMail,
            'errors': updateErrors
        });

        return;
    }

    const newUser = {
        'username': newName,
        'password': newPW,
        'email': newMail        
    };

    db.collection(DB_COLLECTION).update({'_id': request.session.userID}, newUser , (error, result) => {
        response.redirect('/content');
    });
});