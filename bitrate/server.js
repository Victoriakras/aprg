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
    const bitrate = request.body['bitrate'];
    const duration = request.body['duration'];

    if(!isNaN(bitrate) && !isNaN(duration) && bitrate > 0 && duration > 0) {
        const size = bitrate*duration/8;

        response.render('result', {
            'bitrate': bitrate, 
            'duration': duration,
            'size': size
        });
    }
    else {
        response.render('wrongResult', {
            'bitrate': bitrate,
            'duration': duration
        });
    }
});