var character = require('../models/characters');

/* READ ALL CHARACTERS */
exports.list = function(callback) {
    character.find(function(err,characters){
        callback(characters);
    });
};

/* READ A SPECIFIC CHARACTER */
exports.listOne = function(id, callback) {

    //quantifying the visits
    character.update({_id: id}, {$inc: {visits: 1}}, function(err, char) {
        if(err) 
            throw err;

        //finding the character
        character.findOne({_id: id}, function(err, char) {
            if (err) 
                throw err;

            callback(char);
        });
    });
};

/* ADD ONE LIKE TO A UNIQUE CHARACTER BY ID */
exports.like = function(id, callback) {

    character.findByIdAndUpdate(id, {$inc: {likes:1}}, function(err, char) {
      if (err) 
        throw err;

      callback(char);
    });
};

/* INSERT A NEW CHARACTER */
exports.add = function(path, name, about, callback) {

    var newCharacter = {
      path : path,
      name : name,
      about: about,
      likes: 0,
      visits : 0
    };

    var prepare_and = new character(newCharacter);
    prepare_and.save(function (err, data) {
      if (err) 
        throw err;
      else 
        callback(data);
    });

};

/* REMOVE A CHARACTER BY ID */
exports.delete = function(id, callback) {
    character.remove({_id: id}, function(err,removed) {
        if (err)
            throw err;
        else
            callback(removed);
    });
};

/* UPDATE A CHAR  ACTER DATA */
exports.update = function(body, callback) {
    character.findByIdAndUpdate(body.id, {name: body.char_name, about: body.about, path: body.path}, function(err, char) {
      if (err) 
        throw err;
      callback(char);
    });
};