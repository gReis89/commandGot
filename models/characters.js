var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var characterSchema = new Schema({
  name: String,
  about: String,
  likes: Number
})

var character = mongoose.model('characters',characterSchema);

module.exports = character;
