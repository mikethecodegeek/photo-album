'use strict';

var expect = require('chai').expect;

var Album = require('../../models/albums');

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


describe('Album', function() {
    describe('.newAlbum()', function() {

        it('should create a new album in the db.', function(cb) {
            var album = {
                albumName: 'Test Album'
            };

            Album.newAlbum(album, function(err, album) {
                expect(err).to.not.exist;
                expect(album).to.exist;
                //expect(album.albumname).to.equal(album.desc);
                cb();
            });
        });

        it('should NOT create a new album - Missing field', function(cb) {
            var testalbum = {
            };

            Album.newAlbum(testalbum, function(err, album) {
                expect(err).to.exist;
                expect(album).to.not.exist;
                cb();
            });
        });
    });

    

    // describe('.getOneById()', function() {

    // });

});
