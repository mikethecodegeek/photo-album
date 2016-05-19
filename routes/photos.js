var express = require('express');
var router = express.Router();
var Photo = require('../models/photos');
var request = require('request');


router.get('/', (req,res)=> {

    Photo.find({})
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

router.post('/addphoto', (req,res)=> {

    //var auction = new Listing(req.body);
    Photo.addImage(req.body,(err, image)=> {
        if (err){
           // console.log(err);
            res.status(400).send(err)
        } else {
            res.status(200).send(image);
        }
    });

});

router.get('/:imageId', (req,res)=> {
    console.log(req.params);
    Photo.findById(req.params.imageId, (err,data) => {
        console.log(data)
        if (err) {
            console.log(err);
            res.status(400).send(err)
        }
        else {
            res.status(200).send(data);
        }
    })
});


router.delete('/:imageId', (req,res)=> {
    Photo.findByIdAndRemove(req.params.imageId, (err,data)=> {
        if (err){
            console.log(err);
            res.status(400).send(err)
        }
        else {
            res.send(data);
        }
    });
});

router.put('/:imageId', (req,res)=> {
    Photo.findByIdAndUpdate(req.params.imageId,{$set: req.body}, {new:true}, (err,data)=> {
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

