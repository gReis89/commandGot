var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    charRoutes = require('./routes/characters'),
    bodyParser = require('body-parser');

var port = 3000,
    app = express();

// MONGO CONNECTION
var urlString = 'mongodb://frmontini:a1a2a3a4@ds027145.mlab.com:27145/game_of_thrones';
mongoose.connect(urlString, function(error, res) {
    if (error) {
        console.log('Não foi possivel conectar a: ' + urlString);
    } else {
        console.log('Conectado a: ' + urlString);
    }
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/characters', charRoutes);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

http.createServer(app).listen(port, function() {
    console.log("The winter is coming on port " + port);
});
