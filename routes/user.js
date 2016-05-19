var express = require('express');
var router = express.Router();
var User = require('../models/user');
var request = require('request');
var jwt = require('jsonwebtoken');

router.get('/', (req,res)=> {

     User.find({})
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



router.post('/register', (req,res) => {
    User.register(req.body, (err, thisuser)=> {
        //res.cookie('testcookie', 'ok.cookie');
     //   User.sendVerify(req.body, err => {
      //      if (err) {
             //   res.status(400).send(err);
       //     }
       // })
        res.status(err ? 400 : 200).send(err || thisuser);
    })
});

router.get('/currentuser/profile', User.auth(), (req,res) => {
    console.log(req.user);
    res.send(req.user);
});



router.post('/login', (req,res) => {
    User.authenticate(req.body, (err, token) => {
        if (err){
            res.status(400).send(err);
        }
        else {
            res.cookie('accessToken', token).send(token);
        }
    })
});

router.delete('/logout', (req, res) => {
    res.clearCookie('accessToken').send();
});

router.get('/verify/:token', (req, res) => {
    var token = req.params.token;

    User.verify(token, err => {
        if (err) {
            res.redirect('/#/verifyfail');
        } else {
            res.redirect('/#/verifysuccess');
        }
    });
});

router.get('/currentuser/:id', (req,res)=> {
    console.log(req.params.id)
    User.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
            res.status(400).send(err)
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/currentuser/:id', (req,res)=> {
    User.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
            res.status(400).send(err)
        }
        else {
            res.send(data);
        }
    });
});

router.put('/currentuser/:id', (req,res)=> {
    User.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
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

