const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

app.listen(5000, function() {
    console.log('listening to port 3000');
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.post('/calculate', (request, response) => {
    const var1 = request.body['bitrate'];
    const var2 = request.body['duration'];

    if(!isNaN(var1) && !isNaN(var2) && var1 > 0 && var2 > 0) {
        const groesse = var1*var2/8;

        response.render('result', {
            'bitrate': var1, 
            'duration': var2,
            'size': groesse
        });
    }
    else {
        response.render('wrongResult', {
            'bitrate': var1,
            'duration': var2
        });
    }
    // alles auf deutsch 
});