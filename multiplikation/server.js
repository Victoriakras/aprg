const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

const port = 3000;
app.listen(port, function (){
    console.log('listening to port ' + port);
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.post('/calculate', (request, response) => {
    const columns = request.body['columns'];
    const rows = request.body['rows'];

    response.render('table', {
        'columns': columns,
        'rows': rows
    });
});