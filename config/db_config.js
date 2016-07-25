var env = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');

var config = {
    development: {
        db: 'mongodb://command:102030@ds027145.mlab.com:27145/game_of_thrones'
    },
    production: {
        db: 'mongodb://command:102030@ds027145.mlab.com:27145/game_of_thrones'
    },
    test: {
        db: 'mongodb://localhost/node-test'
    }
};

//var urlString = 'mongodb://localhost/API';
var urlString = config[env].db;
mongoose.connect(urlString, function (error, res) {
    if (error) {
        console.log(error);
        console.log('But you forgot your coat =/');
    } else {
        console.log('And you are connected! [' + urlString + ']');
    }
});

//module.exports = config[env];