var express = require('express');
var router = express.Router();

/* Route to print a information about the API when someone type the basic url */
router.get('/', function(req, res) {
    //res.writeHead(200);
    //res.write();  
    //res.end("Welcome to CommandGot API :)");
    res.end();
});