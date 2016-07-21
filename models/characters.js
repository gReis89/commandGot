var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectIdSchema = Schema.ObjectId;
    ObjectId = mongoose.Types.ObjectId;
    character;

if (mongoose.models.Person) {
    character = mongoose.model('Person');
} else {
    var characterSchema = new Schema({
      _id  : ObjectIdSchema,
      name : String,
      about: String,
      likes: Number
    });
    character = mongoose.model('characters', characterSchema);
}

module.exports = character;
