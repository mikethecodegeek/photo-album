var expect = require('chai').expect;

var Photo = require('../../models/photos');

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


describe('Photo', function() {
    describe('.addImage()', function() {

        it('should create a new image in the db.', function(cb) {
            var testimage = {
                imgurl: 'test url',
                createdAt: 'test date',
                description: 'test descr'
            };

            Photo.addImage(testimage, function(err, photo) {
                expect(err).to.not.exist;
                expect(photo).to.exist;
                //expect(album.albumname).to.equal(album.desc);
                cb();
            });
        });

        it('should NOT create a new image - Missing field', function(cb) {
            var testphoto = {
            };

            Photo.addImage(testphoto, function(err, photo) {
                expect(err).to.exist;
                expect(photo).to.not.exist;
                cb();
            });
        });
    });



    // describe('.getOneById()', function() {

    // });

});
