var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectIdSchema = Schema.ObjectId,
    ObjectId = mongoose.Types.ObjectId,
    character;

if (mongoose.models.Characters) {
    character = mongoose.model('Characters');
} else {
    var characterSchema = new Schema({
      _id  : ObjectIdSchema,
      name : String,
      path : String,
      about: String,
      likes: Number
    });
    character = mongoose.model('Characters', characterSchema);
}

module.exports = character;
