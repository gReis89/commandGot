var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = 3000,
    app = express();

var character = require('./models/characters');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

http.createServer(app).listen(port, function(){
    console.log("Express server listening on port " + port);
});
