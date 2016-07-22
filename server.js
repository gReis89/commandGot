var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    db = require('./config/db_config'),
    charRoutes = require('./routes/characters'),
    homeRouter = require('./routes/home'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 8080,
    app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/characters', charRoutes);
app.get('/', function(req, res) {
    res.end("<h1>Welcome to CommandGOT API :)</h1>");
});

http.createServer(app).listen(port, function() {
    console.log("The winter is coming on port " + port);
});
