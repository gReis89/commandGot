var mongoose = require('mongoose');

//var urlString = 'mongodb://localhost/API';
var urlString = 'mongodb://frmontini:a1a2a3a4@ds027145.mlab.com:27145/game_of_thrones';

mongoose.connect(urlString, function(error, res) {
    if (error) {
        console.log('Não foi possivel conectar a: ' + urlString);
    } else {
        console.log('Conectado a: ' + urlString);
    }
});
