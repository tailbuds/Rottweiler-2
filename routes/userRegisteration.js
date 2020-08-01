const express = require('express');
const passport = require('passport');

const router = express.Router();

const User = require('./../models/user');
const { userRegisteration } = require('../controllers/userRegistration');

// router.get('/signup', (req,res,next) => {
//     res.render('signup');
// });   

router.get('/login', (req,res,next) =>{
    passport.authenticate('local',{
        successRedirect: '/login',
        failureRedirect: '/',
        failureFlash: true
    })
});

router.get('/',(req, res, next) => {
    res.render('home');
});

router.post('/', userRegisteration); 

module.exports = router;