var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var characterSchema = new Schema({
  _id  : ObjectIdSchema,
  name : String,
  about: String,
  likes: Number
})

var character = mongoose.model('characters',characterSchema);

module.exports = character;
