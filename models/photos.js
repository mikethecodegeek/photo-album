'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var User = require('./user');
var Album = require('./albums')
//console.log(User);
console.log('');
var photoSchema = new mongoose.Schema({
    imgurl: {type: String, required: true},
    createdAt: {type: String},
    description: {type: String}
});


photoSchema.statics.addImage = function (photoObj, cb){
   // console.log('OBJ:', photoObj)
    var post = new Photo({
        imgurl: photoObj.imgurl,
        createdAt: '3453534',
        description: photoObj.descr
    })

    post.save((err,post) => {
        if (err) {
            cb(err)
        }
        else{
            cb(null, post);
        }
    })

}


var Photo = mongoose.model('Photos', photoSchema);

module.exports = Photo;

