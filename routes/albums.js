var express = require('express');
var router = express.Router();
var Album = require('../models/albums');
var request = require('request');


router.get('/', (req,res)=> {

    Album.find({})
        .exec((err, data) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            }
            else {
                res.send(data);
            }

        });
});

router.post('/newalbum', (req,res)=> {
   // console.log('req.body', req.body)
    Album.newAlbum(req.body,(err, album)=> {
        if (err){
          //  console.log(err);
            res.status(400).send(err)
        } else {
            res.status(200).send(album);
        }
    });

});

router.post('/addimage/:albumId', (req,res) => {
    Album.addPhoto(req, (err,photo) => {
        if (err){
            console.log(err);
            res.status(400).send(err)
        } else {
            res.status(200).send(photo);
        }
        
    })


})

router.post('/removeimage/:albumId', (req,res) => {
    Album.removePhoto(req, (err,photo) => {
        if (err){
            console.log(err);
            res.status(400).send(err)
        } else {
            res.status(200).send(photo);
        }

    })


})

router.get('/:id', (req,res)=> {
    //console.log(req.params.id)
    Album.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
            res.status(400).send(err)
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/:id', (req,res)=> {
    Album.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
            res.status(400).send(err)
        }
        else {
            res.send(data);
        }
    });
});

router.put('/:id', (req,res)=> {
    Album.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
            res.status(400).send(err)
        }
        else {
            res.send(data);
        }
    });
});




module.exports = router;

