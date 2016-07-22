var express = require('express');
var router = express.Router();
var db = require('../config/db_config');
var character = require('../models/characters');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectIdSchema = Schema.ObjectId,
    ObjectId = mongoose.Types.ObjectId;

/*MIDDLEWARE TO QUANTIFY THE VIEWS*/
/*router.use('/:id', function(req, res, next) {
  var id = req.body.id

  
});*/

/* READ ALL CHARACTERS */
router.get('/', function(req, res) {
  character.find(function(err,characters){
    res.json(characters);
  })
});

/* READ A SPECIFIC CHARACTERS */
router.get('/:id', function(req, res) {

  var id = req.params.id;

  character.findOne({_id: id}, function(err, char) {
    if (err) throw err;
    character.update({_id: id}, {$inc: {visits: 1}}, function(err, char) { if(err) throw err});
    res.json(char);
  });

});

/* ADD ONE LIKE TO A UNIQUE CHARACTER BY ID */
router.put('/like', function(req, res) {
    character.findByIdAndUpdate(req.body.id, {$inc: {likes:1}}, function(err, char) {
      if (err) throw err;
      res.json(char);
    });
});

/* INSERT A NEW CHARACTER */
router.post('/add', function(req, res) {
    var newCharacter =
    {
      _id  : new ObjectId(),
      path : req.body.path,
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

/* REMOVE A CHARACTER BY ID */
router.delete('/remove', function (req, res, next) {
    character.remove({_id: req.body.id}, function(err,removed) {
      res.json(removed);
    });
});

module.exports = router;
