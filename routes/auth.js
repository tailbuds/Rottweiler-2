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

router.get(
  '/auth/google/',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      ,
      'https://www.googleapis.com/auth/plus.profile.emails.read',
    ],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/login');
  }
);

module.exports = router;
