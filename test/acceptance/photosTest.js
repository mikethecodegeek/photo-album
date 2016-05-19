const supertest = require('supertest');
const expect = require('chai').expect;

var app = require('../../app');

const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost/photo-album-test';

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

        it('should respond with the array of photos', cb => {

            supertest(app)
                .get('/api/photos')
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
        it('should add new photo to db.', cb => {
            supertest(app)
                .post('/api/photos/addphoto')
                .send({imgurl: 'Test url', createdAt: 'test date', description: 'this is a test'})
                .end((err, res) => {
                   // console.log('res', res)
                    expect(err).to.not.exist;
                    expect(res.statusCode).to.equal(200);
                    cb();
                });
        });

        it('should not add new photo - Missing image url.', cb => {
            supertest(app)
                .post('/api/photos/addphoto')
                .send({})
                .end((err, res) => {
                    expect(err).to.not.exist;
                    expect(res.statusCode).to.equal(400);
                    cb();
                });
        });

    });
});

