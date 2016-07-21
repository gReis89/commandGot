var mongoose = require('mongoose');

//var urlString = 'mongodb://localhost/API';
var urlString = 'mongodb://command:102030@ds027145.mlab.com:27145/game_of_thrones';

mongoose.connect(urlString, function(error, res) {
    if (error) {
        console.log(error);
        console.log('But you forgot your coat =/');
    } else {
        console.log('And you are connected!');
    }
});
