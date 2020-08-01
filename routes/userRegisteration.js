const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

const User = require('./../models/user');
const { userRegisteration } = require('../controllers/userRegisteration');

router.get('/signup', (req,res,next) => {
    res.render('signup');
});   

router.post('/login', (req,res,next) =>{
    passport.authenticate('local',{
        successRedirect: '/login',
        failureRedirect: '/',
        failureFlash: true
    })
});

router.get('/login', (req,res,next) => {
    res.render('login');
});

router.get('/',(req, res, next) => {
    res.render('home');
});

router.post('/', userRegisteration); 

module.exports = router;