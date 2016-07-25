process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server');
var Characters = require('../models/characters');

var should = chai.should(); 

chai.use(chaiHttp);

describe('Characters', function() {

    Characters.collection.drop();

    beforeEach(function (done) {
        var newChar = new Characters({
            name  : "teste",
            path  : "teste",
            about : "teste",
            likes : 0,
            visits: 0
        });
        newChar.save(function (err) {
            done();
        });
    });
    afterEach(function (done) {
        Characters.collection.drop();
        done();
    });

    it('should list ALL Characters on /characters GET', function(done) {
        chai.request(server)
        .get('/characters')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('path');
            res.body[0].should.have.property('about');
            res.body[0].should.have.property('likes');
            res.body[0].should.have.property('visits');
            res.body[0].name.should.equal('teste');
            res.body[0].path.should.equal('teste');
            res.body[0].about.should.equal('teste');
            res.body[0].likes.should.equal(0);
            res.body[0].visits.should.equal(0);
            done();
        });
    });

    it('should list a SINGLE Characters on /characters/<id> GET', function(done) {
        var newChar = new Characters({
            name  : "teste",
            path  : "teste",
            about : "teste",
            likes : 0,
            visits: 0
        });

        newChar.save(function (err, data) {

            //console.log(data);

            chai.request(server)
                .get("/characters/" + data.id)
                .end(function (err, res) {

                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('path');
                    res.body.should.have.property('about');
                    res.body.should.have.property('likes');
                    res.body.should.have.property('visits');

                    res.body.name.should.equal('teste');
                    res.body.path.should.equal('teste');
                    res.body.about.should.equal('teste');
                    res.body.likes.should.equal(0);
                    res.body._id.should.equal(data.id);
                    done();
                });
        });
    });

    it("should add one like to a UNIQUE Character by ID", function(done) {

        chai.request(server)
            .get("/characters")
            .end(function (err, res) {

                chai.request(server)
                    .put('/characters/like')
                    .send({id: res.body[0]._id})
                    .end(function(error, response) {

                        response.should.have.status(200);
                        response.should.be.json;

                        response.body.should.be.a('object');

                        response.body.should.have.property('_id');
                        response.body.should.have.property('name');
                        response.body.should.have.property('path');
                        response.body.should.have.property('about');
                        response.body.should.have.property('likes');
                        response.body.should.have.property('visits');
                        
                        response.body.name.should.equal('teste');
                        response.body.path.should.equal('teste');
                        response.body.about.should.equal('teste');
                        response.body.likes.should.equal(1);
                        response.body._id.should.equal(res.body[0]._id);

                        done();
                    });
            });
    });

    it("should insert a new character on /characters/add POST", function(done) {

         chai.request(server)
            .post("/characters/add")
            .send({ path: "teste", char_name: "teste", about: "teste" })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');

                res.body.should.have.property('path');
                res.body.should.have.property('name');
                res.body.should.have.property('about');
                
                res.body.path.should.equal('teste');
                res.body.name.should.equal('teste');
                res.body.about.should.equal('teste');
                
                done();
            });
    });

    it("should remove a character on /characters/remove DELETE", function(done) {

         chai.request(server)
            .get("/characters")
            .end(function (err, res) {

                //console.log(res.body[0]);
                chai.request(server)
                    .delete('/characters/remove')
                    .send({id: res.body[0]._id})
                    .end(function(error, response) {

                        //console.log(response.body);
                        response.should.have.status(200);
                        response.should.be.json;

                        response.body.should.be.a('object');

                        response.body.should.have.property('ok');
                        response.body.should.have.property('n');
                                                
                        response.body.ok.should.equal(1);
                        response.body.n.should.at.least(1);

                        done();
                    });
            });
    });

    it("should update a character on /characters/update PUT", function(done) {

         chai.request(server)
            .get("/characters")
            .end(function (err, res) {

                chai.request(server)
                    .put('/characters/update')
                    .send({id: res.body[0]._id, char_name: 'Rafael', about: "teste About", path: "Path test"})
                    .end(function(error, response) {

                        response.should.have.status(200);
                        response.should.be.json;

                        response.body.should.be.a('object');

                        response.body.should.have.property('name');
                        response.body.should.have.property('path');
                        response.body.should.have.property('about');

                        response.body.name.should.equal("Rafael");
                        response.body.path.should.equal("Path test");
                        response.body.about.should.equal("teste About");

                        done();
                    });
            });
    });

});