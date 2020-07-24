/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com>
 * Inquiry and support: dev@tailbuds.com
 */

const express = require('express');

const router = express.Router();

const passport = require('passport');

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
    scope: [
      'profile',
      'https://www.googleapis.com/auth/user.birthday.read',
      'email',
      'https://www.googleapis.com/auth/user.gender.read',
    ],
  })
);
// * Facebook AUTH

// router.get('/auth/facebook/', passport.authenticate('facebook'));

// router.get(
//   '/return',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/');
//   }
// );

module.exports = router;
