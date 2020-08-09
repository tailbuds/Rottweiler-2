/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com> and Richa Tiwary <richatiwary1911@gmail.com>
 * Inquiry and support: dev@tailbuds.com
 */

const express = require('express');

const router = express.Router();

const passport = require('passport');

const auth = require('../controllers/auth/traditionalAuth');
const jwtVerify = require('../controllers/auth/jwt');
const verifySignUp = require('../controllers/auth/validator');
// * Google AUTH

router.get(
  '/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
// * Facebook AUTH

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'user_birthday'],
  })
);

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// * Traditional AUTH

// * Login Route
router.post('/login/traditional', auth.signIn);

//* SignUp route
router.post('/signup/new', verifySignUp.checkDuplicateEmail, auth.signUp);

module.exports = router;
