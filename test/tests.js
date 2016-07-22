var expect = require('chai').expect;
var charRoutes = require('../routes/characters');

describe('Try API', function() {
    it('returns characters', function(done) {

        charRoutes.get('/', function(err, followers) {
            // It should return an array object
            expect(Array.isArray(followers)).to.equal(true);
        });

        // getCharacters(username, function(err, followers) {
        //     // It should return an array object
        //     expect(Array.isArray(followers)).to.equal(true);
        //     // Ensure that at least one follower is in the array
        //     expect(followers).to.have.length.above(1);
        //     // Each of the items in the array should be a string
        //     followers.forEach(function(follower) {
        //         expect(follower).to.be.a('string');
        //     });
        //     done();
        // });

    });
});
