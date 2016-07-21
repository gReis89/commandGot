var express = require('express');
var router = express.Router();
var db = require('../config/db_config');
var character = require('../models/characters');

/* READ ALL CHARACTERS */
router.get('/', function(req, res) {
  character.find(function(err,characters){
    res.json(characters);
  })
});

/* ADD ONE LIKE TO A UNIQUE CHARACTER BY ID */
router.post('/like:id', function(req, res) {
    res.send('Post a character.');
});

/* INSERT A NEW CHARACTER */
router.post('/add', function(req, res) {
    var newCharacter =
    {
      _id  : new ObjectId(),
      name : req.body.char_name,
      about: req.body.about,
      likes: 0
    };

    var prepare_and = new character(newCharacter);
    prepare_and.save(function (err, data)
    {
      if (err) res.send(err);
      else res.json(data);
    });
});

module.exports = router;
