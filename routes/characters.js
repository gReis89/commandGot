var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Get a list of characters');
});

router.post('/like:id', function(req, res) {
    res.send('Post a character.');
});

module.exports = router;
