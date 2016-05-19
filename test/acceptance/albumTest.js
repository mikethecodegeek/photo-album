'use strict';

const supertest = require('supertest');
const expect = require('chai').expect;

let app = require('../../app');

const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost/photo-album-test';

var id;

before(function(cb) {
    mongoose.connection.close(function() {
        mongoose.connect(dbUrl, cb);
    });
});

after(function(cb) {
    mongoose.connection.close(cb);
});

//  before each test, empty db, and insert test data


describe('/api/albums', () => {

    describe('GET /', () => {

        it('should respond with the array of albums', cb => {

            supertest(app)
                .get('/api/albums')
                .end((err, res) => {

                    expect(err).to.not.exist;
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                 //   expect(res.body).to.have.length(1);
                 //   expect(res.body[0].desc).to.equal('Write tests');

                    cb();
                });

        });
    });

    describe('POST /', () => {
        it('should create a new album.', cb => {
            supertest(app)
                .post('/api/albums/newalbum')
                .send({albumName: 'Test album'})
                .end((err, res) => {
                  //  console.log('res', res.body)
                    expect(err).to.not.exist;
                    expect(res.statusCode).to.equal(200);
                    
                    
                    cb();
                });
        });

        it('should NOT create a new album - Missing album name.', cb => {
            supertest(app)
                .post('/api/albums/newalbum')
                .send({})
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.statusCode).to.equal(400);
                    cb();
                });
        });

    });
});
