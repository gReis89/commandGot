var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    character;

if (mongoose.models.Person) {
    character = mongoose.model('Person');
} else {
    var characterSchema = new Schema({
        name: String,
        email: String,
        message: String
    });
    character = mongoose.model('characters', PersonSchema);
}

module.exports = character;
