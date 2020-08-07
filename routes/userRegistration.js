const express = require('express');
const passport = require('passport');

const router = express.Router();

const { userRegistration } = require('../controllers/userRegistration');   

router.post('/welcome', (req,res,next) =>{
    passport.authenticate('local',{
        successRedirect: '/welcome',
        failureRedirect: '/loginpage',
        failureFlash: true
    })
});

router.get('/welcome', (req, res, next) =>{
    res.render('welcome');
});

router.get('/create',(req, res, next) => {
    res.render('/loginpage');
});

router.post('/create', userRegistration); 

module.exports = router;