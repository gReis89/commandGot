var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    db = require('./config/db_config'),
    charRoutes = require('./routes/characters'),
    bodyParser = require('body-parser');

var port = 3000,
    app = express();

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
