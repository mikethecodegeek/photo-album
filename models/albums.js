'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var User = require('./user');
var Photo = require('./photos');
//var Album = require('./albums');

var albumSchema = new mongoose.Schema({
    albumName: {type: String, required: true},
    photos: {type: []}

});

albumSchema.statics.newAlbum = function(albumObj, cb) {
   // console.log('ObJ:', albumObj.albumName)
    var post = new Album ({
        albumName: albumObj.albumName,
        photos: []
    });
    post.save((err,post) => {
        if (err){
          //  console.log(err);
            cb(err)
        }
        else {
            cb(null, post)
        }
    })
}

albumSchema.statics.addPhoto = function(photo, cb) {
    //console.log(photo.params)
    var newphoto = {
        name: photo.name,
        imgurl: photo.url,
        createdat: '2423423',
        description: photo.description
    }
    Album.find({_id: photo.params.albumId}, (err, album)=> {
        if (err) {
            cb(err)
        }
          else {
       //  console.log(album)
           album[0].photos.push(newphoto);
           album[0].save((err)=> {
              if(err) {
                 cb(err)
             }
            else {
                 cb(album)
               }
            })
          }
    })
}

albumSchema.statics.removePhoto = function(photo, cb) {
   // console.log(photo.params)

    Album.find({_id: photo.params.albumId}, (err, album)=> {
        if (err) {
            cb(err)
        }
        else {
            //  console.log(album)
            var index = album[0].photos.indexOf(photo);
            console.log(index)
            album[0].save((err)=> {
                if(err) {
                    cb(err)
                }
                else {
                    cb(album)
                }
            })
        }
    })
}

var Album = mongoose.model('Albums', albumSchema);

module.exports = Album;

