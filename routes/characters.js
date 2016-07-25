var express = require('express');
var router = express.Router();
var db = require('../config/db_config');
var character = require('../models/characters');
var characterController = require('../controllers/characterController.js');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectIdSchema = Schema.ObjectId,
    ObjectId = mongoose.Types.ObjectId;

/* READ ALL CHARACTERS */
router.get('/', function(req, res) {
  characterController.list(function(resp) {
    res.json(resp);
  });
});

/* READ A SPECIFIC CHARACTER */
router.get('/:id', function(req, res) {

  var id = req.params.id;

  characterController.listOne(id, function(resp) {
    res.json(resp);
  });
});

/* ADD ONE LIKE TO A UNIQUE CHARACTER BY ID */
router.put('/like', function(req, res) {

  var id = req.body.id;

  characterController.like(id, function(resp) {
    res.json(resp);
  });
});

/* INSERT A NEW CHARACTER */
router.post('/add', function(req, res) {
    characterController.add(req.body.path, req.body.char_name, req.body.about, function(resp) {
      res.json(resp);
    });
});

/* REMOVE A CHARACTER BY ID */
router.delete('/remove', function (req, res, next) {
    characterController.delete(req.body.id, function(resp) {
      res.json(resp);
    });
});

/* UPDATE A CHAR  ACTER DATA */
router.put('/update', function(req, res) {
    characterController.update(req.body, function(resp) {
      res.json(resp);
    });
});

module.exports = router;
